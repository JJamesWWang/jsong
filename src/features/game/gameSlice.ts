import { createSlice } from "@reduxjs/toolkit";
import {
  receiveCorrectGuess,
  receiveDisconnected,
  receiveEndRound,
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
  timeRemaining: number;
  settings: GameSettings | null;
}

const initialState: GameState = {
  isActive: false,
  players: [],
  previousTrack: null,
  round: 0,
  timeRemaining: 0,
  settings: null,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(receiveStartGame, (state, action) => {
      state.isActive = true;
      state.players = action.payload.players;
      state.settings = action.payload.settings;
    });
    builder.addCase(receiveStartRound, (state) => {
      state.round += 1;
      state.timeRemaining = state.settings!.playLength;
    });
    builder.addCase(receiveCorrectGuess, (state, action) => {
      const player = state.players.find((p) => p.uid === action.payload.uid);
      if (player) {
        player.score += 1;
        player.isCorrect = true;
      }
    });
    builder.addCase(receiveEndRound, (state, action) => {
      state.timeRemaining = 0;
      state.previousTrack = action.payload;
    });
    builder.addCase(receiveDisconnected, (state, action) => {
      state.players = state.players.filter(
        (player) => player.uid !== action.payload.uid
      );
    });
  },
});

export default gameSlice.reducer;
