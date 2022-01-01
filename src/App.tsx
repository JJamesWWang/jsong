import { useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import LandingPage from "./pages/LandingPage";
import { bindWebsocket } from "./features/websocket";
import "./App.css";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [client, setClient] = useState<W3CWebSocket>();

  function onConnected(websocket: W3CWebSocket) {
    console.log(websocket);
    bindWebsocket(websocket);
    setClient(websocket);
    setIsConnected(true);
  }

  return (
    <div className="App">
      {!isConnected && <LandingPage onConnected={onConnected} />}
      {isConnected && <h1>Connected!</h1>}
    </div>
  );
}

export default App;
