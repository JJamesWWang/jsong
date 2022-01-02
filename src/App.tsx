import { useState } from "react";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { RootState } from "./app/store";
import LobbyPage from "./pages/LobbyPage";
import LandingPage from "./pages/LandingPage";
import "./App.css";

function App() {
  const [isOnline, setIsOnline] = useState(false);
  const [username, setUsername] = useState("");

  function onSubmitLogin(username: string) {
    setUsername(username);
    setIsOnline(true);
  }

  function onWebsocketError() {
    setTimeout(() => {
      setIsOnline(false);
    }, 5000);
  }

  const dispatch = useAppDispatch();

  function onWebsocketMessage(message: MessageEvent) {
    const data: { event: string; payload: any } = JSON.parse(message.data);
    console.log(data);
    dispatch({ type: `server/${data.event}`, payload: data.payload });
  }

  return (
    <div className="App">
      {!isOnline && <LandingPage onSubmitLogin={onSubmitLogin} />}
      {isOnline && (
        <LobbyPage
          onWebsocketMessage={onWebsocketMessage}
          onWebsocketError={onWebsocketError}
          username={username}
        />
      )}
    </div>
  );
}

export default App;
