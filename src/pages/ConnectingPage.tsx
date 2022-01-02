import { useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { websocketEndpoint } from "../app/config";

type LandingPageProps = {
  username: string;
  onWebsocketMessage: (message: MessageEvent) => void;
  onWebsocketError: () => void;
};

function ConnectingPage(props: LandingPageProps) {
  const { readyState } = useWebSocket(websocketEndpoint(props.username), {
    share: true,
    onMessage: props.onWebsocketMessage,
    onError: props.onWebsocketError,
  });
  const isConnecting = readyState === 0;
  const isConnected = readyState === 1;
  const isConnectionFailed = readyState === 2 || readyState === 3;

  return (
    <>
      {isConnecting && <p>Connecting...</p>}
      {isConnectionFailed && (
        <p>
          Failed to connect. Please try again later or contact James @
          jjameswwang@gmail.com
        </p>
      )}
      {isConnected && <p>Connected!</p>}
    </>
  );
}

export default ConnectingPage;
