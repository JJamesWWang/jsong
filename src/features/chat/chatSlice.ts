import { createSlice } from "@reduxjs/toolkit";
import { Member } from "../lobby/lobbySlice";
import { receiveConnected, receiveDisconnected } from "../serverActions";

export const serverMember: Member = {
  uid: "server",
  username: "Server",
  isHost: false,
};

export type ChatMessage = {
  member: Member;
  content: string;
};

export interface ChatState {
  messages: ChatMessage[];
}

const initialState: ChatState = {
  messages: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(receiveConnected, (state, action) => {
      const joinedMember = action.payload;
      state.messages = pushMessage(
        state,
        serverMember,
        `${joinedMember.username} has entered the chat.`
      );
    });
    builder.addCase(receiveDisconnected, (state, action) => {
      const leftMember = action.payload;
      state.messages = pushMessage(
        state,
        serverMember,
        `${leftMember.username} has left the chat.`
      );
    });
  },
});

function pushMessage(state: ChatState, member: Member, content: string) {
  return [...state.messages, { member, content }];
}

export default chatSlice.reducer;
