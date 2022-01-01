import { useState } from "react";
import useWebSocket from "react-use-websocket";
import LandingPage from "./pages/LandingPage";
import "./App.css";

function App() {
  const { sendJsonMessage, readyState } = useWebSocket("ws://localhost:8000/ws");

  const isConnecting = readyState === 0;
  const isConnected = readyState === 1;
  const isConnectionFailed = readyState === 2 || readyState === 3;

  return (
    <div className="App">
      {!isConnected && (
        <LandingPage
          isConnecting={isConnecting}
          isConnected={isConnected}
          isConnectionFailed={isConnectionFailed}
        />
      )}
      {isConnected && <h1>Connected!</h1>}
    </div>
  );
}

export default App;
