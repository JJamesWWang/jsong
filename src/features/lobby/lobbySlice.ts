import { createSlice } from "@reduxjs/toolkit";

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
});

export default lobbySlice.reducer;
