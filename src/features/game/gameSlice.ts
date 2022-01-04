import { createSlice } from "@reduxjs/toolkit";
import {
  receiveDisconnected,
} from "../serverActions";

export type Player = {
  uid: string;
  username: string;
  score: number;
  isCorrect: boolean;
};

export interface GameState {
  player: Player | null;
  players: Player[];
}

const initialState: GameState = {
  player: null,
  players: [],
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
      if (state.player?.uid === action.payload.uid) {
        state.player = null;
      }
    });
  },
});

export default gameSlice.reducer;
