const baseProtocol = "http";
const baseUrl = "localhost:8000";

export const websocketEndpoint = (username: string) =>
  baseProtocol === "http"
    ? `ws://${baseUrl}/ws/${username}`
    : `wss://${baseUrl}/ws/${username}`;

export const claimHostEndpoint = (uid: string) =>
  `${baseProtocol}://${baseUrl}/lobby/host/${uid}`;

export const setPlaylistEndpoint = `${baseProtocol}://${baseUrl}/lobby/playlist`;

export const startGameEndpoint = (uid: string) =>
  `${baseProtocol}://${baseUrl}/lobby/start/${uid}`;

export const setReadyEndpoint = (uid: string) =>
  `${baseProtocol}://${baseUrl}/lobby/ready/${uid}`;

export const trackEndpoint = () => `${baseProtocol}://${baseUrl}/lobby/track?randomizer=${new Date().getTime()}`;

export const endGameEndpoint = (uid: string) =>
  `${baseProtocol}://${baseUrl}/lobby/end/${uid}`;
