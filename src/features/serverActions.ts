import { createAction } from "@reduxjs/toolkit";
import { Member } from "./lobby/lobbySlice";
import { Player, GameSettings, Track } from "./game/gameSlice";

export const receiveContext = createAction<Member[]>("server/context");
export const receiveConnected = createAction<Member>("server/connected");
export const receiveDisconnected = createAction<Member>("server/disconnected");
export const receiveChat =
  createAction<{ member: Member; content: string }>("server/chat");
export const receiveTransferHost = createAction<Member>("server/transfer_host");
export const receiveStartGame =
  createAction<{ players: Player[]; settings: GameSettings }>("server/start_game");
export const receiveNextRound = createAction("server/next_round");
export const receiveStartRound = createAction("server/start_round");
export const receiveCorrectGuess = createAction<Player>("server/correct_guess");
export const receiveEndRound = createAction<Track>("server/end_round");
export const receiveEndGame = createAction("server/end_game");
