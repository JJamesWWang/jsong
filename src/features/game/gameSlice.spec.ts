import {
  receiveCorrectGuess,
  receiveDisconnected,
  receiveEndGame,
  receiveEndRound,
  receiveNextRound,
  receiveStartGame,
  receiveStartRound,
} from "../serverActions";
import gameReducer, {
  decrementTimeRemaining,
  GameSettings,
  GameState,
  Player,
  Track,
} from "./gameSlice";
import { member1 } from "../lobby/lobbySlice.spec";

describe("game reducer", () => {
  it("should handle initial state", () => {
    expect(gameReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should set the initial game state", () => {
    const actual = gameReducer(initialState, receiveStartGame(startGamePayload));
    expect(actual.isActive).toEqual(true);
    expect(actual.players).toEqual(players);
    expect(actual.previousTrack).toEqual(null);
    expect(actual.round).toEqual(0);
    expect(actual.timeRemaining).toEqual(0);
    expect(actual.settings).toEqual(settings);
    expect(actual.arePlayersReady).toEqual(false);
  });

  it("should set the server as ready when the round advances", () => {
    const started = gameReducer(initialState, receiveStartGame(startGamePayload));
    const actual = gameReducer(started, receiveNextRound());
    expect(actual.isServerReady).toEqual(true);
  });

  it("should start set the timer when the round starts", () => {
    const started = gameReducer(initialState, receiveStartGame(startGamePayload));
    const actual = gameReducer(started, receiveStartRound());
    expect(actual.timeRemaining).toEqual(settings.playLength);
  });

  it("should increment the round when the round starts", () => {
    const started = gameReducer(initialState, receiveStartGame(startGamePayload));
    const actual = gameReducer(started, receiveStartRound());
    expect(actual.round).toEqual(1);
  });

  it("should set players as ready when the round starts", () => {
    const started = gameReducer(initialState, receiveStartGame(startGamePayload));
    const actual = gameReducer(started, receiveStartRound());
    expect(actual.arePlayersReady).toEqual(true);
  });

  it("should decrement timeRemaining", () => {
    const started = gameReducer(initialState, receiveStartGame(startGamePayload));
    const roundStarted = gameReducer(started, receiveStartRound());
    const actual = gameReducer(roundStarted, decrementTimeRemaining());
    expect(actual.timeRemaining).toEqual(settings.playLength - 1);
  });

  it("should set score correctly when someone guesses correctly", () => {
    const started = gameReducer(initialState, receiveStartGame(startGamePayload));
    const roundStarted = gameReducer(started, receiveStartRound());
    const actual = gameReducer(
      roundStarted,
      receiveCorrectGuess({ ...player1, score: player1.score + 1 })
    );
    expect(actual.players[0].score).toEqual(1);
    expect(actual.players[1].score).toEqual(0);
  });

  it("should set isCorrect when someone guesses correctly", () => {
    const started = gameReducer(initialState, receiveStartGame(startGamePayload));
    const roundStarted = gameReducer(started, receiveStartRound());
    const actual = gameReducer(
      roundStarted,
      receiveCorrectGuess({ ...player1, isCorrect: true })
    );
    expect(actual.players[0].isCorrect).toEqual(true);
    expect(actual.players[1].isCorrect).toEqual(false);
  });

  it("shouldn't decrement past 0", () => {
    const started = gameReducer(initialState, receiveStartGame(startGamePayload));
    const roundStarted = gameReducer(started, receiveStartRound());
    let state = roundStarted;
    for (let i = 0; i < settings.playLength; i++) {
      state = gameReducer(state, decrementTimeRemaining());
    }
    const actual = gameReducer(state, decrementTimeRemaining());
    expect(actual.timeRemaining).toEqual(0);
  });

  it("should set the time remaining to 0 when the round ends", () => {
    const started = gameReducer(initialState, receiveStartGame(startGamePayload));
    const roundStarted = gameReducer(started, receiveStartRound());
    const actual = gameReducer(roundStarted, receiveEndRound(track1));
    expect(actual.timeRemaining).toEqual(0);
  });

  it("should set the previous track when the round ends", () => {
    const started = gameReducer(initialState, receiveStartGame(startGamePayload));
    const roundStarted = gameReducer(started, receiveStartRound());
    const actual = gameReducer(roundStarted, receiveEndRound(track1));
    expect(actual.previousTrack).toEqual(track1);
  });

  it("should set all players back to not correct when the round ends", () => {
    const started = gameReducer(initialState, receiveStartGame(startGamePayload));
    const roundStarted = gameReducer(started, receiveStartRound());
    const guessedCorrectly = gameReducer(roundStarted, receiveCorrectGuess(player1));
    const actual = gameReducer(guessedCorrectly, receiveEndRound(track1));
    expect(actual.players[0].isCorrect).toEqual(false);
    expect(actual.players[1].isCorrect).toEqual(false);
  });

  it("should set the server as not ready when the round ends", () => {
    const started = gameReducer(initialState, receiveStartGame(startGamePayload));
    const roundStarted = gameReducer(started, receiveStartRound());
    const actual = gameReducer(roundStarted, receiveEndRound(track1));
    expect(actual.isServerReady).toEqual(false);
  });

  it("should set players as not ready when the round ends", () => {
    const started = gameReducer(initialState, receiveStartGame(startGamePayload));
    const roundStarted = gameReducer(started, receiveStartRound());
    const actual = gameReducer(roundStarted, receiveEndRound(track1));
    expect(actual.arePlayersReady).toEqual(false);
  });

  it("should remove disconnected players", () => {
    const started = gameReducer(initialState, receiveStartGame(startGamePayload));
    const actual = gameReducer(started, receiveDisconnected(member1));
    expect(actual.players).toEqual([player2]);
  });

  it("should set the game as inactive when the game ends", () => {
    const started = gameReducer(initialState, receiveStartGame(startGamePayload));
    const roundStarted = gameReducer(started, receiveStartRound());
    const roundEnded = gameReducer(roundStarted, receiveEndRound(track1));
    const actual = gameReducer(roundEnded, receiveEndGame());
    expect(actual.isActive).toEqual(false);
  });
});

const initialState: GameState = {
  isActive: false,
  players: [],
  previousTrack: null,
  round: 0,
  timeRemaining: 0,
  settings: null,
  isServerReady: false,
  arePlayersReady: false,
};

const settings: GameSettings = {
  playlistName: "playlist",
  maxRounds: 3,
  playLength: 10,
};
export const player1: Player = { uid: "1", username: "1", score: 0, isCorrect: false };
export const player2: Player = { uid: "2", username: "2", score: 0, isCorrect: false };
const players = [player1, player2];
export const startGamePayload = { players, settings };
export const track1: Track = { name: "track1", artists: ["artist1"] };
