import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import "./App.css";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  function usernameEntered(username: string) {
    setIsConnected(true);
  }

  return (
    <div className="App">
      {!isConnected && !isPlaying && <LandingPage usernameEntered={usernameEntered} />}
      {isConnected && !isPlaying && <h1>Connected!</h1>}
      {isConnected && isPlaying && <h1>Playing!</h1>}
    </div>
  );
}

export default App;
