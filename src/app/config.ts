const baseProtocol = "https";
const baseUrl = "jsong-api.herokuapp.com";

export const websocketEndpoint = (username: string) =>
  // @ts-ignore
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

export const trackEndpoint = (round: number) => `${baseProtocol}://${baseUrl}/lobby/track?round=${round}`;

export const endGameEndpoint = (uid: string) =>
  `${baseProtocol}://${baseUrl}/lobby/end/${uid}`;
