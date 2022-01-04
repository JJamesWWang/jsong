import { useAppSelector } from "../app/hooks";
import styles from "./Leaderboard.module.css";

function Leaderboard() {
  const players = useAppSelector((state) => state.game.players);
  const playerRows = players.map((player) => (
    <tr key={player.uid} className={styles.tr}>
      <td className={styles.username}>{player.username}</td>
      <td className={styles.score}>{player.score}</td>
    </tr>
  ));
  return (
    <div className={styles.leaderboard}>
      <p>Leaderboard:</p>
      <table className={styles.table}>
        <tbody className={styles.tbody}>{playerRows}</tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
