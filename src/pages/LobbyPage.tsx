import Chat from "../components/Chat";
import MemberList from "../components/MemberList";
import InputBox from "../components/ui/InputBox";

function LobbyPage() {
  return (
    <div>
      <MemberList />
      <Chat />
      <InputBox
        name="spotify_url"
        label="Paste Spotify playlist link:"
        error="Please enter a valid Spotify playlist."
      />
    </div>
  );
}

export default LobbyPage;
