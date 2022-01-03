import chatReducer, { ChatMessage, ChatState, serverMember } from "./chatSlice";
import {
  receiveConnected,
  receiveDisconnected,
  receiveChat,
  receiveTransferHost,
} from "../serverActions";
import { Member } from "../lobby/lobbySlice";

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
});

const initialState: ChatState = {
  messages: [],
};
const member1: Member = { uid: "1", username: "1", isHost: true };
const member2: Member = { uid: "2", username: "2", isHost: false };
const message1: ChatMessage = { member: member1, content: "Hello" };
const message2: ChatMessage = { member: member2, content: "World!" };
