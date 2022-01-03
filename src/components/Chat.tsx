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

  return (
    <>
      <MessageBox />
      <InputBox name="chat" autoFocus={true} onSubmit={sendJsonMessage} />
    </>
  );
}

export default Chat;
