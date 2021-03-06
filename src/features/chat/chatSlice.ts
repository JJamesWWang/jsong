import { createSlice } from "@reduxjs/toolkit";
import { Member } from "../lobby/lobbySlice";
import {
  receiveChat,
  receiveConnected,
  receiveCorrectGuess,
  receiveDisconnected,
  receiveDownloadingTrack,
  receiveEndGame,
  receiveEndRound,
  receiveStartGame,
  receiveStartRound,
  receiveTransferHost,
} from "../serverActions";

export const serverMember: Member = {
  uid: "server",
  username: "Server",
  isHost: false,
};

export type ChatMessage = {
  member: Member;
  content: string;
  isCorrect?: boolean;
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
    builder.addCase(receiveChat, (state, action) => {
      const { member, content } = action.payload;
      state.messages = pushMessage(state, member, content);
    });
    builder.addCase(receiveTransferHost, (state, action) => {
      const newHost = action.payload;
      state.messages = pushMessage(
        state,
        serverMember,
        `${newHost.username} is now the host.`
      );
    });
    builder.addCase(receiveStartGame, (state) => {
      state.messages = pushMessage(state, serverMember, "Game has started.");
    });
    builder.addCase(receiveDownloadingTrack, (state) => {
      state.messages = pushMessage(state, serverMember, "Downloading next track...");
    });
    builder.addCase(receiveStartRound, (state) => {
      state.messages = pushMessage(state, serverMember, "Sending track to everyone...");
    });
    builder.addCase(receiveCorrectGuess, (state, action) => {
      state.messages = pushMessage(
        state,
        serverMember,
        `${action.payload.username} has guessed correctly!`,
        true
      );
    });
    builder.addCase(receiveEndRound, (state, action) => {
      state.messages = pushMessage(
        state,
        serverMember,
        `The playing track was: ${action.payload.name} by ${action.payload.artists.join(
          ", "
        )}`
      );
    });
    builder.addCase(receiveEndGame, (state) => {
      state.messages = pushMessage(state, serverMember, "Game has ended.");
    });
  },
});

function pushMessage(
  state: ChatState,
  member: Member,
  content: string,
  isCorrect?: boolean
) {
  return [...state.messages, { member, content, isCorrect }];
}

export default chatSlice.reducer;
