import { useState } from "react";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { RootState } from "./app/store";
import LobbyPage from "./pages/LobbyPage";
import LandingPage from "./pages/LandingPage";
import "./App.css";

function App() {
  const [isConnecting, setIsLoggingIn] = useState(false);
  const [username, setUsername] = useState("");
  function onSubmitLogin(username: string) {
    setUsername(username);
    setIsLoggingIn(true);
  }

  function onWebsocketMessage(message: MessageEvent) {
    const data = JSON.parse(message.data);
    console.log(data);
  }

  return (
    <div className="App">
      {!isConnecting && <LandingPage onSubmitLogin={onSubmitLogin} />}
      {isConnecting && (
        <LobbyPage onWebsocketMessage={onWebsocketMessage} username={username} />
      )}
    </div>
  );
}

export default App;
