import { useAppSelector } from "../app/hooks";
import Chat from "../components/Chat";
import MemberList from "../components/MemberList";
import Button from "../components/ui/Button";
import InputBox from "../components/ui/InputBox";
import styles from "./GamePage.module.css";

function GamePage() {
  const player = useAppSelector((state) => state.game.player);
  const isHost = useAppSelector(
    (state) => state.lobby.member && state.lobby.member.isHost
  );

  const hostOptions = (
    <div className={styles.hostOptions}>
      <InputBox
        name="spotifyUrl"
        label="Paste Spotify playlist link:"
        error="Please enter a valid Spotify playlist."
        autoFocus={true}
      />
      {/* <Button onClick={startGame}>Start Game</Button> */}
    </div>
  );
  const clientOptions = (
    <div className={styles.clientOptions}>
      {/* <Button onClick={claimHost}>Claim Host</Button> */}
    </div>
  );
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

export default GamePage;
