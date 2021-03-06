import { useState } from "react";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { RootState } from "./app/store";
import { websocketEndpoint } from "./app/config";
import ConnectingPage from "./pages/ConnectingPage";
import LandingPage from "./pages/LandingPage";
import LobbyPage from "./pages/LobbyPage";
import useWebSocket from "react-use-websocket";
import "./App.css";
import GamePage from "./pages/GamePage";

function App() {
  const [isOnline, setIsOnline] = useState(false);
  const [username, setUsername] = useState("");

  function onSubmitLogin(username: string) {
    setUsername(username);
    setIsOnline(true);
  }
  const landingPage = <LandingPage onSubmitLogin={onSubmitLogin} />;

  const dispatch = useAppDispatch();
  function onWebsocketMessage(message: MessageEvent) {
    const data: { event: string; payload: any } = JSON.parse(message.data);
    dispatch({ type: `server/${data.event}`, payload: data.payload });
    console.log(data);
  }

  function onWebsocketError() {
    setTimeout(() => {
      setIsOnline(false);
    }, 5000);
  }

  const { readyState } = useWebSocket(
    websocketEndpoint(username),
    {
      share: true,
      onMessage: onWebsocketMessage,
      onError: onWebsocketError,
    },
    isOnline
  );
  const connectingPage = <ConnectingPage readyState={readyState} />;

  const isAuthenticated = useAppSelector(
    (state: RootState) => state.lobby.member !== null
  );

  const gameIsActive = useAppSelector((state: RootState) => state.game.isActive);

  return (
    <div className="App">
      {!isOnline && landingPage}
      {isOnline && !isAuthenticated && connectingPage}
      {isOnline && isAuthenticated && !gameIsActive && <LobbyPage />}
      {isOnline && isAuthenticated && gameIsActive && <GamePage />}
    </div>
  );
}

export default App;
