import useWebSocket from "react-use-websocket";
import { websocketEndpoint } from "../app/config";
import { useAppSelector } from "../app/hooks";
import MessageBox from "./MessageBox";
import InputBox from "./ui/InputBox";
import styles from "./Chat.module.css";

function Chat() {
  const chatInputSize = 64;
  const member = useAppSelector((state) => state.lobby.member);

  const { sendJsonMessage } = useWebSocket(
    websocketEndpoint(member ? member.username : ""),
    { share: true }
  );

  return (
    <div className={styles.chat}>
      <MessageBox />
      <InputBox name="chat" size={chatInputSize} onSubmit={sendJsonMessage} />
    </div>
  );
}

export default Chat;
