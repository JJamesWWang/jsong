import lobbyReducer, { LobbyState } from "./lobbySlice";
import {
  receiveContext,
  receiveConnected,
  receiveDisconnected,
} from "../serverActions";

describe("lobby reducer", () => {
  it("should handle initial state", () => {
    expect(lobbyReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should be empty when no one's in the lobby", () => {
    const actual = lobbyReducer(initialState, receiveContext([]));
    expect(actual.member).toEqual(null);
    expect(actual.members).toEqual([]);
  });

  it("should add existing lobby members", () => {
    const actual = lobbyReducer(initialState, receiveContext(members));
    expect(actual.member).toEqual(null);
    expect(actual.members).toEqual(members);
  });

  it("should add the connected member to members", () => {
    const actual = lobbyReducer(initialState, receiveConnected(member1));
    expect(actual.member).toEqual(member1);
    expect(actual.members).toEqual([member1]);
  });

  it("should correctly add the member when there's existing lobby members", () => {
    const afterContext = lobbyReducer(initialState, receiveContext([member1, member2]));
    const actual = lobbyReducer(afterContext, receiveConnected(member3));
    expect(actual.member).toEqual(member3);
    expect(actual.members).toEqual(members);
  });

  it("should remove a member if they disconnect", () => {
    const afterContext = lobbyReducer(initialState, receiveContext([member1]));
    const afterConnected = lobbyReducer(afterContext, receiveConnected(member2));
    const actual = lobbyReducer(afterConnected, receiveDisconnected(member1));
    expect(actual.members).toEqual([member2]);
  });

  it("should reset this member if they disconnect", () => {
    const afterConnected = lobbyReducer(initialState, receiveConnected(member1));
    const actual = lobbyReducer(afterConnected, receiveDisconnected(member1));
    expect(actual.member).toEqual(null);
    expect(actual.members).toEqual([]);
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
