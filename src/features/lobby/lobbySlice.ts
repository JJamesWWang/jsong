import { createSlice } from "@reduxjs/toolkit";
import {
  receiveContext,
  receiveConnected,
  receiveDisconnected,
  receiveTransferHost,
} from "../serverActions";

export type Member = {
  uid: string;
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
    builder.addCase(receiveDisconnected, (state, action) => {
      state.members = state.members.filter(
        (member) => member.uid !== action.payload.uid
      );
      if (state.member?.uid === action.payload.uid) {
        state.member = null;
      }
    });
    builder.addCase(receiveTransferHost, (state, action) => {
      if (state.member) {
        state.member = {
          ...state.member,
          isHost: state.member.uid === action.payload.uid,
        };
      }
      state.members = state.members.map((member) => ({
        ...member,
        isHost: member.uid === action.payload.uid,
      }));
    });
  },
});

export default lobbySlice.reducer;
