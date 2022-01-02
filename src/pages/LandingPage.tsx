import InputBox from "../components/ui/InputBox";

function LandingPage(props: { onSubmitLogin: (username: string) => void }) {
  function usernameEntered(username: string) {
    props.onSubmitLogin(username);
  }

  return (
    <InputBox
      name="username"
      label="Enter your username:"
      error="Please enter a non-empty username."
      onSubmit={usernameEntered}
    />
  );
}

export default LandingPage;
