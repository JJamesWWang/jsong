import useWebSocket from "react-use-websocket";
import { useAppDispatch } from "../app/hooks";
import { websocketEndpoint } from "../app/config";
import InputBox from "../components/ui/InputBox";
import { authenticate } from "../features/lobby/lobbySlice";

type LandingPageProps = {
  onWebsocketMessage: (message: MessageEvent) => void;
};

function LandingPage(props: LandingPageProps) {
  const { readyState } = useWebSocket(websocketEndpoint, {
    share: true,
    onMessage: props.onWebsocketMessage,
  });
  const isConnecting = readyState === 0;
  const isConnected = readyState === 1;
  const isConnectionFailed = readyState === 2 || readyState === 3;

  const dispatch = useAppDispatch();
  function usernameEntered(username: string) {
    dispatch(authenticate(username));
  }

  return (
    <>
      {isConnecting && <p>Connecting...</p>}
      {isConnected && (
        <InputBox
          name="username"
          label="Enter your username:"
          error="Please enter a non-empty username."
          onSubmit={usernameEntered}
        />
      )}
      {isConnectionFailed && (
        <p>
          Failed to connect. Please try again later or contact James @
          jjameswwang@gmail.com
        </p>
      )}
    </>
  );
}

export default LandingPage;
