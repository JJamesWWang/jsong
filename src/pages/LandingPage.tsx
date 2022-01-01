import { useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { createWebsocket } from "../features/websocket";
import InputBox from "../components/ui/InputBox";

type LandingPageProps = {
  onConnected: (client: W3CWebSocket) => void;
};

function LandingPage(props: LandingPageProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  function usernameEntered(username: string) {
    setIsConnecting(true);
    const websocket = createWebsocket(username);
    props.onConnected(websocket);
  }

  return (
    <>
      {!isConnecting && (
        <InputBox
          name="username"
          label="Enter your username:"
          error="Please enter a non-empty username."
          onSubmit={usernameEntered}
        />
      )}
      {isConnecting && <h1>Connecting...</h1>}
    </>
  );
}

export default LandingPage;
