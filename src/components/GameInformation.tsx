import { useAppSelector } from "../app/hooks";
import styles from "./GameInformation.module.css";

function GameInformation() {
  const gameState = useAppSelector((state) => state.game);
  const previousSong = gameState.previousTrack
    ? `${gameState.previousTrack.name} by ${gameState.previousTrack.artists.join(", ")}`
    : "None";
  return (
    <div className={styles.gameInformation}>
      <p>Game Information:</p>
      <div className={styles.information}>
        <section>
          <p>Time Remaining:</p>
          <p>{gameState.timeRemaining}</p>
        </section>
        <section>
          <p>Rounds:</p>
          <p>{`${gameState.round}/${gameState.settings?.maxRounds}`}</p>
        </section>
        <section>
          <p>Previous song:</p>
          <p>{previousSong}</p>
        </section>
        <section>
          <p>Playlist name:</p>
          <p>{gameState.settings?.playlistName}</p>
        </section>
      </div>
    </div>
  );
}

export default GameInformation;
