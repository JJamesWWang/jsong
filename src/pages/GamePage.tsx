import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { endGameEndpoint, setReadyEndpoint, trackEndpoint } from "../app/config";
import Chat from "../components/Chat";
import GameInformation from "../components/GameInformation";
import Leaderboard from "../components/Leaderboard";
import Button from "../components/ui/Button";
import styles from "./GamePage.module.css";
import ReactAudioPlayer from "react-audio-player";
import { decrementTimeRemaining } from "../features/game/gameSlice";

function GamePage() {
  const member = useAppSelector((state) => state.lobby.member);
  function endGame() {
    if (member) {
      fetch(endGameEndpoint(member.uid), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  const hostOptions = (
    <div className={styles.hostOptions}>
      {<Button onClick={endGame}>End Game</Button>}
    </div>
  );
  const playerOptions = member?.isHost ? hostOptions : null;

  const [player, setPlayer] = useState<ReactAudioPlayer | null>(null);
  async function setReady() {
    if (member) {
      fetch(setReadyEndpoint(member.uid), {
        method: "POST",
        headers: { pragma: "no-cache", "cache-control": "no-cache" },
      });
    }
  }

  const isServerReady = useAppSelector((state) => state.game.isServerReady);
  const arePlayersReady = useAppSelector((state) => state.game.arePlayersReady);
  useEffect(() => {
    if (arePlayersReady) {
      player?.audioEl.current?.play();
    }
  }, [player, arePlayersReady]);

  const dispatch = useAppDispatch();
  const timeRemaining = useAppSelector((state) => state.game.timeRemaining);
  useEffect(() => {
    setTimeout(() => {
      dispatch(decrementTimeRemaining());
    }, 1000);
  }, [dispatch, timeRemaining]);

  return (
    <>
      {isServerReady && (
        <ReactAudioPlayer
          src={trackEndpoint}
          ref={(e) => setPlayer(e)}
          onCanPlay={(e) => setReady()}
          volume={0.15}
        />
      )}
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
