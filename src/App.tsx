import { useAppSelector, useAppDispatch } from "./app/hooks";
import { RootState } from "./app/store";
import LandingPage from "./pages/LandingPage";
import LobbyPage from "./pages/LobbyPage";
import "./App.css";

function App() {
  const isAuthenticated = useAppSelector(
    (state: RootState) =>
      state.lobby.connection && state.lobby.connection.isAuthenticated
  );

  function onWebsocketMessage(message: MessageEvent) {
    const data = JSON.parse(message.data);
    console.log(data);
  }

  return (
    <div className="App">
      {!isAuthenticated && <LandingPage onWebsocketMessage={onWebsocketMessage} />}
      {isAuthenticated && <LobbyPage />}
    </div>
  );
}

export default App;
