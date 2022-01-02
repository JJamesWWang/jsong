import chatReducer, { ChatMessage, ChatState, serverMember } from "./chatSlice";
import { receiveConnected } from "../serverActions";
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
});

const initialState: ChatState = {
  messages: [],
};
const member1: Member = { uid: "1", username: "1", isHost: true };
const member2: Member = { uid: "2", username: "2", isHost: false };
const message1: ChatMessage = { member: member1, content: "Hello" };
