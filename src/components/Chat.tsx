import MessageBox from "./MessageBox";
import InputBox from "./ui/InputBox";

function Chat() {
  const chatInputSize = 64;

  function onChatSubmit(content: string) {
    console.log(content);
  }

  return (
    <div>
      <p>Chat:</p>
      <MessageBox />
      <InputBox name="chat" size={chatInputSize} onSubmit={onChatSubmit} />
    </div>
  );
}

export default Chat;
