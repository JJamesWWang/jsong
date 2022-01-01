import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import "./App.css";

function App() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div className="App">
      {!isConnected && <LandingPage />}
      {isConnected && <h1>Connected!</h1>}
    </div>
  );
}

export default App;
