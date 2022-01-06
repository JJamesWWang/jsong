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
import Slider from "../components/ui/Slider";

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

  const [volume, setVolume] = useState(0.05);
  const volumeSlider = (
    <Slider
      name="volume"
      label="Adjust Volume:"
      onChange={(v: number) => setVolume(v / 100)}
    />
  );
  const hostOptions = (
    <div className={styles.hostOptions}>
      {<Button onClick={endGame}>End Game</Button>}
    </div>
  );
  const playerOptions = (
    <>
      {volumeSlider}
      {member?.isHost && hostOptions}
    </>
  );

  const [player, setPlayer] = useState<ReactAudioPlayer | null>(null);
  async function setReady() {
    if (member) {
      fetch(setReadyEndpoint(member.uid), {
        method: "POST",
        cache: "no-store",
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

  const round = useAppSelector((state) => state.game.round) || 1;
  return (
    <>
      {isServerReady && (
        <ReactAudioPlayer
          src={trackEndpoint(round)}
          ref={(e) => setPlayer(e)}
          onCanPlay={(e) => setReady()}
          volume={volume}
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
