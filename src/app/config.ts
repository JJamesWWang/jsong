const baseProtocol = "http";
const baseUrl = "localhost:8000";

export const websocketEndpoint = (username: string) =>
  baseProtocol === "http"
    ? `ws://${baseUrl}/ws/${username}`
    : `wss://${baseUrl}/ws/${username}`;

export const claimHostEndpoint = (uid: string) =>
  `${baseProtocol}://${baseUrl}/lobby/host/${uid}`;
