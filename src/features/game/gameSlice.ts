import { createSlice } from "@reduxjs/toolkit";
import {
  receiveCorrectGuess,
  receiveDisconnected,
  receiveEndGame,
  receiveEndRound,
  receiveNextRound,
  receiveStartGame,
  receiveStartRound,
} from "../serverActions";

export type Player = {
  uid: string;
  username: string;
  score: number;
  isCorrect: boolean;
};

export type GameSettings = {
  playlistName: string;
  maxRounds: number;
  playLength: number;
  startRoundDelay: number;
};

export type Track = {
  name: string;
  artists: string[];
};

export interface GameState {
  isActive: boolean;
  players: Player[];
  previousTrack: Track | null;
  round: number;
  startRoundDelayRemaining: number;
  timeRemaining: number;
  settings: GameSettings | null;
  isServerReady: boolean;
  arePlayersReady: boolean;
}

const initialState: GameState = {
  isActive: false,
  players: [],
  previousTrack: null,
  round: 0,
  startRoundDelayRemaining: 0,
  timeRemaining: 0,
  settings: null,
  isServerReady: false,
  arePlayersReady: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    decrementStartRoundDelayRemaining: (state) => {
      state.startRoundDelayRemaining = Math.max(0, state.startRoundDelayRemaining - 1);
    },
    decrementTimeRemaining: (state) => {
      state.timeRemaining = Math.max(0, state.timeRemaining - 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(receiveStartGame, (state, action) => {
      state.isActive = true;
      state.players = action.payload.players;
      state.settings = action.payload.settings;
    });
    builder.addCase(receiveNextRound, (state) => {
      state.isServerReady = true;
    });
    builder.addCase(receiveStartRound, (state) => {
      if (!state.isActive) {
        return;
      }
      state.round += 1;
      state.timeRemaining = state.settings!.playLength;
      state.startRoundDelayRemaining = state.settings!.startRoundDelay;
      state.arePlayersReady = true;
    });
    builder.addCase(receiveCorrectGuess, (state, action) => {
      if (!state.isActive) {
        return;
      }
      const index = state.players.findIndex((p) => p.uid === action.payload.uid);
      if (index !== -1) {
        state.players[index].score = action.payload.score;
        state.players[index].isCorrect = true;
        state.players.sort((p1, p2) => p2.score - p1.score);
      }
    });
    builder.addCase(receiveEndRound, (state, action) => {
      if (!state.isActive) {
        return;
      }
      state.timeRemaining = 0;
      state.previousTrack = action.payload;
      state.players = state.players.map((p) => ({ ...p, isCorrect: false }));
      state.isServerReady = false;
      state.arePlayersReady = false;
    });
    builder.addCase(receiveDisconnected, (state, action) => {
      if (!state.isActive) {
        return;
      }
      state.players = state.players.filter(
        (player) => player.uid !== action.payload.uid
      );
    });
    builder.addCase(receiveEndGame, (state) => {
      state.isActive = initialState.isActive;
      state.players = initialState.players;
      state.previousTrack = initialState.previousTrack;
      state.round = initialState.round;
      state.timeRemaining = initialState.timeRemaining;
      state.settings = initialState.settings;
      state.arePlayersReady = initialState.arePlayersReady;
    });
  },
});

export const { decrementStartRoundDelayRemaining, decrementTimeRemaining } =
  gameSlice.actions;

export default gameSlice.reducer;
