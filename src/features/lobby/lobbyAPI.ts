import { websocketEndpoint } from "../../app/config";

export function getWebsocket(username: string) {
  return fetch(websocketEndpoint(username));
}
