export const websocketEndpoint = "ws://localhost:8000/ws";
export const authenticateEndpoint = (uid: string, username: string) =>
  `http://localhost:8000/ws/${uid}/${username}`;
