import { useAppSelector } from "../app/hooks";
import { trackEndpoint } from "../app/config";
import Chat from "../components/Chat";
import GameInformation from "../components/GameInformation";
import Leaderboard from "../components/Leaderboard";
import Button from "../components/ui/Button";
import styles from "./GamePage.module.css";
import ReactAudioPlayer from "react-audio-player";

function GamePage() {
  const isHost = useAppSelector(
    (state) => state.lobby.member && state.lobby.member.isHost
  );

  const hostOptions = (
    <div className={styles.hostOptions}>
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
      <ReactAudioPlayer src={trackEndpoint} />
      <div className={styles.topFiller} />
      <div className={styles.mainPanel}>
        <Leaderboard />
        <div className={styles.centerPanel}>
          <Chat />
          {playerOptions}
        </div>
        <GameInformation />
      </div>
    </>
  );
}

export default GamePage;
