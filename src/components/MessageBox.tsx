import { useAppSelector } from "../app/hooks";

function MessageBox() {
  const messageObjects = useAppSelector((state) => state.chat.messages);
  const messages = messageObjects.map((message) => (
    <li>
      {message.member.username}: {message.content}
    </li>
  ));

  return (
    <>
      <p>Message Box</p>
      <ul>{messages}</ul>
    </>
  );
}

export default MessageBox;
