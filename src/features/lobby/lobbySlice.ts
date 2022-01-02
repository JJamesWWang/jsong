import { createSlice } from "@reduxjs/toolkit";
import { receiveContext, receiveConnected } from "../serverActions";

export type Member = {
  uid: string;
  websocket?: WebSocket;
  username: string;
  isHost: boolean;
};

export interface LobbyState {
  member: Member | null;
  members: Member[];
}

const initialState: LobbyState = {
  member: null,
  members: [],
};

export const lobbySlice = createSlice({
  name: "lobby",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(receiveContext, (state, action) => {
      state.members = action.payload;
    });
    builder.addCase(receiveConnected, (state, action) => {
      if (!state.member) {
        state.member = action.payload;
      }
      state.members = [...state.members, action.payload];
    });
  },
});

export default lobbySlice.reducer;
