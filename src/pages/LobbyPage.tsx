import { claimHostEndpoint } from "../app/config";
import { useAppSelector } from "../app/hooks";
import Chat from "../components/Chat";
import MemberList from "../components/MemberList";
import Button from "../components/ui/Button";
import InputBox from "../components/ui/InputBox";
import styles from "./LobbyPage.module.css";

function LobbyPage() {
  const playlistInputSize = 128;

  const member = useAppSelector((state) => state.lobby.member);
  function claimHost() {
    if (member) {
      fetch(claimHostEndpoint(member.uid), { method: "PUT" });
    }
  }

  const isHost = useAppSelector(
    (state) => state.lobby.member && state.lobby.member.isHost
  );

  function startGame() {
    console.log("Start game");
  }

  return (
    <>
      <div className={styles.topFiller} />
      <div className={styles.topPanel}>
        <MemberList />
        <Chat />
        <div className={styles.flexFiller}></div>
      </div>
      {isHost && (
        <>
          <InputBox
            name="spotifyUrl"
            size={playlistInputSize}
            label="Paste Spotify playlist link:"
            error="Please enter a valid Spotify playlist."
          />
          <Button onClick={startGame}>Start Game</Button>
        </>
      )}
      {!isHost && <Button onClick={claimHost}>Claim Host</Button>}
    </>
  );
}

export default LobbyPage;
