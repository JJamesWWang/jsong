type ConnectingPageProps = {
  readyState: number;
};

function ConnectingPage(props: ConnectingPageProps) {
  const isConnecting = props.readyState === 0;
  const isConnected = props.readyState === 1;
  const isConnectionFailed = props.readyState === 2 || props.readyState === 3;

  return (
    <>
      {isConnecting && <p>Connecting...</p>}
      {isConnectionFailed && (
        <p>
          Failed to connect. Please try again later or contact James @
          jjameswwang@gmail.com
        </p>
      )}
      {isConnected && <p>Connected!</p>}
    </>
  );
}

export default ConnectingPage;
