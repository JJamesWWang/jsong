import { useAppSelector } from "../app/hooks";
import styles from "./MessageBox.module.css";
import { serverMember } from "../features/chat/chatSlice";

function MessageBox() {
  const messageObjects = useAppSelector((state) => state.chat.messages);
  const messages = messageObjects.map((message, i) => {
    const style = `${styles.username} + ${
      message.member === serverMember ? styles.serverChat : styles.userChat
    }`;
    return (
      <li key={i} className={styles.li}>
        <span className={style}>{message.member.username + ":"}</span>
        {message.content}
      </li>
    );
  });

  return (
    <>
      <p>Chat:</p>
      <ul className={styles.ul}>{messages}</ul>
    </>
  );
}

export default MessageBox;
