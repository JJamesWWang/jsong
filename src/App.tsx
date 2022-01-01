import { useState } from "react";
import InputBox from "./components/ui/InputBox";
import "./App.css";

const landingPage = (props: { usernameEntered: (username: string) => void }) => {
  return (
    <>
      <h1>Welcome to Jsong!</h1>
      <InputBox
        name="username"
        label="Enter your username:"
        onSubmit={props.usernameEntered}
      />
    </>
  );
};

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  function usernameEntered(username: string) {
    setIsConnected(true);
  }

  return (
    <div className="App">
      {!isConnected && !isPlaying && landingPage({ usernameEntered })}
      {isConnected && !isPlaying && <h1>Connected!</h1>}
      {isConnected && isPlaying && <h1>Playing!</h1>}
    </div>
  );
}

export default App;
