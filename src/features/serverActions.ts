import { createAction } from "@reduxjs/toolkit";
import { Member } from "./lobby/lobbySlice";

export const receiveContext = createAction<Member[]>("server/context");
export const receiveConnected = createAction<Member>("server/connected");
