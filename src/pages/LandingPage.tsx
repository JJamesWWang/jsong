import InputBox from "../components/ui/InputBox";
import styles from "./LandingPage.module.css";

function LandingPage(props: { onSubmitLogin: (username: string) => void }) {
  function usernameEntered(username: string) {
    props.onSubmitLogin(username);
  }

  return (
    <div className={styles.landingPage}>
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
