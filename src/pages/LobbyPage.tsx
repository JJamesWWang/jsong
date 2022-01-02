import { useAppSelector } from "../app/hooks";
import Chat from "../components/Chat";
import MemberList from "../components/MemberList";
import Button from "../components/ui/Button";
import InputBox from "../components/ui/InputBox";

function LobbyPage() {
  const playlistInputSize = 128;
  const isHost = useAppSelector(
    (state) => state.lobby.member && state.lobby.member.isHost
  );

  return (
    <div>
      <MemberList />
      <Chat />
      {isHost && (
        <InputBox
          name="spotifyUrl"
          size={playlistInputSize}
          label="Paste Spotify playlist link:"
          error="Please enter a valid Spotify playlist."
        />
      )}
      {!isHost && <Button>Claim Host</Button>}
    </div>
  );
}

export default LobbyPage;
