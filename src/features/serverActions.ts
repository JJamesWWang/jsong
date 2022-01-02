import { createAction } from "@reduxjs/toolkit";
import { Member } from "./lobby/lobbySlice";

export const receiveContext = createAction<Member[]>("server/context");
export const receiveConnected = createAction<Member>("server/connected");
export const receiveDisconnected = createAction<Member>("server/disconnected");
export const receiveChat =
  createAction<{ member: Member; content: string }>("server/chat");
