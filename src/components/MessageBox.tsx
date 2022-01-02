import { useAppSelector } from "../app/hooks";

function MessageBox() {
  const messageObjects = useAppSelector((state) => state.chat.messages);
  const messages = messageObjects.map((message, i) => (
    <li key={i}>
      {message.member.username}: {message.content}
    </li>
  ));

  return <ul>{messages}</ul>;
}

export default MessageBox;
