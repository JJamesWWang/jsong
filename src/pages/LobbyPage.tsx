import { useState } from "react";
import {
  claimHostEndpoint,
  setPlaylistEndpoint,
  startGameEndpoint,
} from "../app/config";
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

  const [playlist, setPlaylist] = useState("");
  async function startGame() {
    if (await trySetPlaylist()) {
      startGame();
    }

    async function trySetPlaylist() {
      try {
        const response = await fetch(setPlaylistEndpoint, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ link: playlist }),
        });
        if (response.status !== 200) {
          throw new Error("Playlist invalid");
        }
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    }

    function startGame() {
      if (member) {
        fetch(startGameEndpoint(member.uid), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
      }
    }
  }

  const hostOptions = (
    <div className={styles.hostOptions}>
      <InputBox
        name="spotifyUrl"
        label="Paste Spotify playlist link:"
        error="Please enter a valid Spotify playlist."
        autoFocus={true}
        onChange={(value) => setPlaylist(value)}
      />
      <Button onClick={startGame}>Start Game</Button>
    </div>
  );
  const clientOptions = (
    <div className={styles.clientOptions}>
      <Button onClick={claimHost}>Claim Host</Button>
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

export default LobbyPage;
