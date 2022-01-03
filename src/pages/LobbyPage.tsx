import { claimHostEndpoint } from "../app/config";
import { useAppSelector } from "../app/hooks";
import Chat from "../components/Chat";
import MemberList from "../components/MemberList";
import Button from "../components/ui/Button";
import InputBox from "../components/ui/InputBox";
import styles from "./LobbyPage.module.css";

function LobbyPage() {
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

  const hostOptions = (
    <div className={styles.hostOptions}>
      <InputBox
        name="spotifyUrl"
        label="Paste Spotify playlist link:"
        error="Please enter a valid Spotify playlist."
      />
      <Button onClick={startGame}>Start Game</Button>
    </div>
  );
  const clientOptions = <Button onClick={claimHost}>Claim Host</Button>;
  const playerOptions = isHost ? hostOptions : clientOptions;

  return (
    <>
      <div className={styles.topFiller} />
      <div className={styles.mainPanel}>
        <MemberList />
        <div className={styles.centerPanel}>
          <Chat />
          {playerOptions}
        </div>
        <div className={styles.flexFiller}></div>
      </div>
    </>
  );
}

export default LobbyPage;
