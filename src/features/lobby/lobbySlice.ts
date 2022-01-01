import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postUsername } from "./lobbyAPI";

type Connection = {
  websocket: WebSocket;
  uid: string;
  isAuthenticating: boolean;
  isAuthenticated: boolean;
};

type User = {
  uid: string;
  username: string;
  isHost: boolean;
};

export interface LobbyState {
  connection: Connection | null;
  user: User | null;
  users: User[];
}

const initialState: LobbyState = {
  connection: null,
  user: null,
  users: [],
};

export const authenticate = createAsyncThunk(
  "lobby/setUsername",
  async (username: string) => {
    const response = await postUsername(username);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const lobbySlice = createSlice({
  name: "lobby",
  initialState,
  reducers: {
    setConnection(state, action: PayloadAction<{ websocket: WebSocket; uid: string }>) {
      state.connection = {
        websocket: action.payload.websocket,
        uid: action.payload.uid,
        isAuthenticating: false,
        isAuthenticated: false,
      };
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.users = state.users.find((user) => user.uid === action.payload.uid)
        ? state.users
        : [...state.users, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.pending, (state) => {
        if (state.connection) {
          state.connection.isAuthenticating = true;
        }
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        if (state.connection) {
          state.connection.isAuthenticating = false;
          state.connection.isAuthenticated = true;
        }
      });
  },
});

export const { setConnection, setUser } = lobbySlice.actions;
export default lobbySlice.reducer;
