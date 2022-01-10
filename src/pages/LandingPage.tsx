import InputBox from "../components/ui/InputBox";
import styles from "./LandingPage.module.css";

function LandingPage(props: { onSubmitLogin: (username: string) => void }) {
  function usernameEntered(username: string) {
    props.onSubmitLogin(username);
  }

  return (
    <div className={styles.landingPage}>
      <div className={styles.welcome}>
        <h1>Welcome to Replay!</h1>
        <p>
          Replay is a game where you compete to identify a song or artist as quickly as
          you can. Songs are randomly drawn from a Spotify playlist that you provide,
          and each song is played at a random timestamp for 20 seconds.
        </p>
        <h2>How to play:</h2>
        <ol>
          <li>
            When a round starts, type into the chat what you think the name of the song
            or artist is.
          </li>
          <li>
            You will be awarded full points for getting the name right, but will receive
            only half of the points if you get the artist right.
          </li>
          <li>
            The faster you can guess the name or artist, the more points you will
            receive.
          </li>
          <li>The player with the highest score wins!</li>
        </ol>
      </div>
      <div className={styles.inputBox}>
        <InputBox
          name="username"
          label="Enter your username:"
          error="Please enter a non-empty username."
          autoFocus={true}
          onSubmit={usernameEntered}
        />
      </div>
    </div>
  );
}

export default LandingPage;
