import InputBox from "../components/ui/InputBox";
import classes from "./LandingPage.module.css";

function LandingPage(props: { usernameEntered: (username: string) => void }) {
  return (
    <div className={classes.LandingPage}>
      <InputBox
        name="username"
        label="Enter your username:"
        onSubmit={props.usernameEntered}
      />
    </div>
  );
}

export default LandingPage;
