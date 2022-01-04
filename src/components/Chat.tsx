import useWebSocket from "react-use-websocket";
import { websocketEndpoint } from "../app/config";
import { useAppSelector } from "../app/hooks";
import MessageBox from "./MessageBox";
import InputBox from "./ui/InputBox";

function Chat() {
  const member = useAppSelector((state) => state.lobby.member);

  const { sendJsonMessage } = useWebSocket(
    websocketEndpoint(member ? member.username : ""),
    { share: true }
  );

  const style = { width: "100%" };

  return (
    <div style={style}>
      <MessageBox />
      <InputBox name="chat" autoFocus={true} onSubmit={sendJsonMessage} />
    </div>
  );
}

export default Chat;
