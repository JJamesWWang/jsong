import { createSlice } from "@reduxjs/toolkit";
import { receiveDisconnected } from "../serverActions";

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
    builder.addCase(receiveDisconnected, (state, action) => {
      state.players = state.players.filter(
        (player) => player.uid !== action.payload.uid
      );
    });
  },
});

export default gameSlice.reducer;
