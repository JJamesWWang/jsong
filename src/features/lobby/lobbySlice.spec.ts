import lobbyReducer, { LobbyState } from "./lobbySlice";
import { receiveContext, receiveConnected } from "../serverActions";

describe("lobby reducer", () => {
  it("should handle initial state", () => {
    expect(lobbyReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle empty context", () => {
    const actual = lobbyReducer(initialState, receiveContext([]));
    expect(actual.member).toEqual(null);
    expect(actual.members).toEqual([]);
  });

  it("should handle context", () => {
    const actual = lobbyReducer(initialState, receiveContext(members));
    expect(actual.member).toEqual(null);
    expect(actual.members).toEqual(members);
  });

  it("should handle connected with no context", () => {
    const actual = lobbyReducer(initialState, receiveConnected(member1));
    expect(actual.member).toEqual(member1);
    expect(actual.members).toEqual([member1]);
  });

  it("should handle connected with context", () => {
    const afterContext = lobbyReducer(initialState, receiveContext([member1, member2]));
    const actual = lobbyReducer(afterContext, receiveConnected(member3));
    expect(actual.member).toEqual(member3);
    expect(actual.members).toEqual(members);
  });
});

const initialState: LobbyState = {
  member: null,
  members: [],
};
const member1 = { uid: "1", username: "1", isHost: true };
const member2 = { uid: "2", username: "2", isHost: false };
const member3 = { uid: "3", username: "3", isHost: false };
const members = [member1, member2, member3];
