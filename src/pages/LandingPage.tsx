import { useState } from "react";
import InputBox from "../components/ui/InputBox";

function LandingPage() {
  const [isConnecting, setIsConnecting] = useState(false);

  function usernameEntered(username: string) {
    setIsConnecting(true);
  }

  return (
    <>
      <InputBox
        name="username"
        label="Enter your username:"
        onSubmit={usernameEntered}
      />
      {isConnecting && <h1>Connecting...</h1>}
    </>
  );
}

export default LandingPage;
