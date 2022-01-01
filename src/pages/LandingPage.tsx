import InputBox from "../components/ui/InputBox";

type LandingPageProps = {
  isConnecting: boolean;
  isConnected: boolean;
  isConnectionFailed: boolean;
};

function LandingPage(props: LandingPageProps) {
  function usernameEntered(username: string) {
    console.log(username);
  }

  return (
    <>
      {props.isConnecting && <p>Connecting...</p>}
      {props.isConnected && (
        <InputBox
          name="username"
          label="Enter your username:"
          error="Please enter a non-empty username."
          onSubmit={usernameEntered}
        />
      )}
      {props.isConnectionFailed && (
        <p>
          Failed to connect. Please try again later or contact James @
          jjameswwang@gmail.com
        </p>
      )}
    </>
  );
}

export default LandingPage;
