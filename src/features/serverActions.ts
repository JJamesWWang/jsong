import { createAction } from "@reduxjs/toolkit";
import { Member } from "./lobby/lobbySlice";

type ContextMessage = {
  payload: Member[];
};

type ConnectedMessage = {
  payload: Member;
};

export const receiveContext = createAction<ContextMessage>("server/context");
export const receiveConnected = createAction<ConnectedMessage>("server/connected");
