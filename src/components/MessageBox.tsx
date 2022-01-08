import { useEffect, useRef } from "react";
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
  const messagesEndRef = useRef<null | HTMLLIElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const shouldAnnounceRoundStarting = useAppSelector(
    (state) => state.game.startRoundDelayRemaining > 0
  );
  const timeUntilRoundStarts = useAppSelector(
    (state) => state.game.startRoundDelayRemaining
  );

  const roundStartingMessage = (
    <div className={styles.roundStartingMessage}>
      {`Round starting in ${timeUntilRoundStarts}...`}
    </div>
  );

  const messagesHTML = (
    <ul className={styles.ul}>
      {messages}
      <li ref={messagesEndRef} />
    </ul>
  );

  return (
    <>
      {shouldAnnounceRoundStarting && roundStartingMessage}
      {!shouldAnnounceRoundStarting && messagesHTML}
    </>
  );
}

export default MessageBox;
