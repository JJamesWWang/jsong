import { w3cwebsocket as W3CWebSocket } from "websocket";

export function createWebsocket(username: string) {
  return new W3CWebSocket(`ws://localhost:8080/${username}`);
}

export function bindWebsocket(websocket: W3CWebSocket) {
  websocket.onopen = onWebsocketOpen;
  websocket.onclose = onWebsocketClose;
  websocket.onerror = onWebsocketError;
  websocket.onmessage = onWebsocketMessage;
}

function onWebsocketOpen() {
  console.log("websocket open");
}

function onWebsocketClose() {
  console.log("websocket closed");
}

function onWebsocketError() {
  console.log("websocket error");
}

function onWebsocketMessage() {
  console.log("websocket message");
}
