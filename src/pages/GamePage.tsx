import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { endGameEndpoint, setReadyEndpoint, trackEndpoint } from "../app/config";
import Chat from "../components/Chat";
import GameInformation from "../components/GameInformation";
import Leaderboard from "../components/Leaderboard";
import Button from "../components/ui/Button";
import styles from "./GamePage.module.css";
import ReactAudioPlayer from "react-audio-player";
import {
  decrementStartRoundDelayRemaining,
  decrementTimeRemaining,
} from "../features/game/gameSlice";
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
      min={1}
      max={1000}
      value={volume * 1000}
      onChange={(v: number) => setVolume(v / 1000)}
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
  const startRoundDelayRemaining = useAppSelector(
    (state) => state.game.startRoundDelayRemaining
  );

  useEffect(() => {
    if (arePlayersReady && startRoundDelayRemaining === 0) {
      player?.audioEl.current?.play();
    }
  }, [player, arePlayersReady, startRoundDelayRemaining]);

  const dispatch = useAppDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(decrementStartRoundDelayRemaining());
    }, 1000);
  }, [dispatch, startRoundDelayRemaining]);

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
