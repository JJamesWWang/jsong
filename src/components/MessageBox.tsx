import { useAppSelector } from "../app/hooks";
import styles from "./MessageBox.module.css";

function MessageBox() {
  const messageObjects = useAppSelector((state) => state.chat.messages);
  const messages = messageObjects.map((message, i) => (
    <li key={i}>
      {message.member.username}: {message.content}
    </li>
  ));

  return (
    <div className={styles.messageBox}>
      <p>Chat:</p>
      <ul className={styles.ul}>{messages}</ul>
    </div>
  );
}

export default MessageBox;
