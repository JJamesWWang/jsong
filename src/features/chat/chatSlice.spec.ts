import chatReducer, { ChatMessage, ChatState, serverMember } from "./chatSlice";
import {
  receiveConnected,
  receiveDisconnected,
  receiveChat,
  receiveTransferHost,
  receiveStartGame,
  receiveEndGame,
  receiveCorrectGuess,
  receiveDownloadingTrack,
  receiveStartRound,
  receiveEndRound,
} from "../serverActions";
import { member1, member2 } from "../lobby/lobbySlice.spec";
import { player1, startGamePayload, track1 } from "../game/gameSlice.spec";

describe("chat reducer", () => {
  it("should handle initial state", () => {
    expect(chatReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should indicate a new member has joined the chat", () => {
    const actual = chatReducer(initialState, receiveConnected(member1));
    expect(actual.messages[0].member).toEqual(serverMember);
    expect(actual.messages[0].content).toContain(member1.username);
  });

  it("should indicate when a member leaves", () => {
    const connected = chatReducer(initialState, receiveConnected(member1));
    const actual = chatReducer(connected, receiveDisconnected(member1));
    expect(actual.messages[1].member).toEqual(serverMember);
    expect(actual.messages[1].content).toContain(member1.username);
  });

  it("should keep track of messages", () => {
    const connected1 = chatReducer(initialState, receiveConnected(member1));
    const connected2 = chatReducer(connected1, receiveConnected(member2));
    const messaged1 = chatReducer(
      connected2,
      receiveChat({ member: member1, content: "Hello" })
    );
    const actual = chatReducer(
      messaged1,
      receiveChat({ member: member2, content: "World!" })
    );
    expect(actual.messages[2]).toEqual(message1);
    expect(actual.messages[3]).toEqual(message2);
  });

  it("should indicate when the host is transferred", () => {
    const connected = chatReducer(initialState, receiveConnected(member1));
    const actual = chatReducer(connected, receiveTransferHost(member1));
    expect(actual.messages[1].member).toEqual(serverMember);
    expect(actual.messages[1].content).toContain(member1.username);
  });

  it("should announce the game is starting", () => {
    const connected = chatReducer(initialState, receiveConnected(member1));
    const actual = chatReducer(connected, receiveStartGame(startGamePayload));
    expect(actual.messages[1].member).toEqual(serverMember);
  });

  it("should indicate that the server is downloading the next track", () => {
    const connected = chatReducer(initialState, receiveConnected(member1));
    const started = chatReducer(connected, receiveStartGame(startGamePayload));
    const actual = chatReducer(started, receiveDownloadingTrack());
    expect(actual.messages[2].member).toEqual(serverMember);
  });

  it("should indicate when the round is ready to start", () => {
    const connected = chatReducer(initialState, receiveConnected(member1));
    const started = chatReducer(connected, receiveStartGame(startGamePayload));
    const downloaded = chatReducer(started, receiveDownloadingTrack());
    const actual = chatReducer(downloaded, receiveStartRound());
    expect(actual.messages[3].member).toEqual(serverMember);
  });

  it("should announce a player guessed correctly", () => {
    const connected = chatReducer(initialState, receiveConnected(member1));
    const started = chatReducer(connected, receiveStartGame(startGamePayload));
    const actual = chatReducer(started, receiveCorrectGuess(player1));
    expect(actual.messages[2].member).toEqual(serverMember);
    expect(actual.messages[2].content).toContain(player1.username);
    expect(actual.messages[2].isCorrect).toBeTruthy();
  });

  it("should display the track when the round ends", () => {
    const connected = chatReducer(initialState, receiveConnected(member1));
    const started = chatReducer(connected, receiveStartGame(startGamePayload));
    const roundStarted = chatReducer(started, receiveStartRound());
    const actual = chatReducer(roundStarted, receiveEndRound(track1));
    expect(actual.messages[2].member).toEqual(serverMember);
  });

  it("should announce the game is over", () => {
    const connected = chatReducer(initialState, receiveConnected(member1));
    const started = chatReducer(connected, receiveStartGame(startGamePayload));
    const actual = chatReducer(started, receiveEndGame());
    expect(actual.messages[2].member).toEqual(serverMember);
  });
});

const initialState: ChatState = {
  messages: [],
};
const message1: ChatMessage = { member: member1, content: "Hello" };
const message2: ChatMessage = { member: member2, content: "World!" };
