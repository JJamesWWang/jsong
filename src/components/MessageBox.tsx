import { useEffect, useRef } from "react";
import { useAppSelector } from "../app/hooks";
import styles from "./MessageBox.module.css";
import { serverMember } from "../features/chat/chatSlice";

function MessageBox() {
  const messageObjects = useAppSelector((state) => state.chat.messages);
  const messages = messageObjects.map((message, i) => {
    const liStyle = `${styles.li}${message.isCorrect ? " " + styles.correct : ""}`;
    const spanStyle = `${styles.username} ${
      message.member === serverMember ? styles.serverChat : styles.userChat
    }`;
    return (
      <li key={i} className={liStyle}>
        <span className={spanStyle}>{message.member.username + ":"}</span>
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
    <li>{`Round starting in ${timeUntilRoundStarts}...`}</li>
  );

  const messagesHTML = (
    <>
      {messages}
      <li ref={messagesEndRef} />
    </>
  );

  const style = `${styles.ul}${
    shouldAnnounceRoundStarting ? " " + styles.roundStartingMessage : ""
  }`;
  return (
    <ul className={style}>
      {shouldAnnounceRoundStarting && roundStartingMessage}
      {!shouldAnnounceRoundStarting && messagesHTML}
    </ul>
  );
}

export default MessageBox;
