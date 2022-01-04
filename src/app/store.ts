import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import lobbyReducer from "../features/lobby/lobbySlice";
import chatReducer from "../features/chat/chatSlice";
import gameReducer from "../features/game/gameSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    lobby: lobbyReducer,
    chat: chatReducer,
    game: gameReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
