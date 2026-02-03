/** @format */
import { beforeEach, describe, expect, it } from "vitest";

import { players } from "../../../mocks/players";
import {
  CLEAR_SELECTED_PLAYER,
  SET_PLAYERS,
  SET_REQUEST_STATUS,
  SET_SELECTED_PLAYER,
} from "../../constants";
import playersReducer from "../playersReducer";
import selectedPlayerReducer from "../selectedPlayerReducer";
import statusReducer from "../statusReducer";
import { REQ_STATUS } from "../../../../cypress/e2e/constants";

describe("playersReducer", () => {
  it("should return the initial state when no matching type in switch-case", () => {
    expect(playersReducer(undefined, {})).toEqual([]);
  });
  it("should handle SET_PLAYERS by returning its payload", () => {
    const payload = players.map((player) => ({
      id: player.id,
      name: player.name,
    }));
    const setPlayers = {
      type: SET_PLAYERS,
      payload,
    };
    expect(playersReducer(undefined, setPlayers)).toEqual(setPlayers.payload);
  });
});

describe("statusReducer", () => {
  it("should return the initial state when no matching type in switch-case", () => {
    expect(statusReducer(undefined, {})).toEqual(REQ_STATUS.loading);
  });
  for (const state of ["loading", "success", "error"]) {
    it(`Payload ${state}: should handle SET_STATUS by returning REQ_STATUS[${state}]`, () => {
      const payload = REQ_STATUS[state];
      const setStatus = {
        type: SET_REQUEST_STATUS,
        payload,
      };
      expect(statusReducer(undefined, setStatus)).toEqual(REQ_STATUS[state]);
    });
  }
});

describe("selectedPlayerReducer", () => {
  it("should return the initial state when no matching type in switch-case", () => {
    expect(selectedPlayerReducer(undefined, {})).toEqual({});
  });
  it(`should handle SET_SELECTED_PLAYER by returning payload`, () => {
    const payload = players[0];
    const setSelectedPlayer = {
      type: SET_SELECTED_PLAYER,
      payload,
    };
    expect(selectedPlayerReducer(undefined, setSelectedPlayer)).toEqual(
      payload
    );
  });
  it(`should handle CLEAR_SELECTED_PLAYER by returning payload`, () => {
    const playerToClear = players[0];
    const setSelectedPlayer = {
      type: CLEAR_SELECTED_PLAYER,
    };
    expect(selectedPlayerReducer(playerToClear, setSelectedPlayer)).toEqual({});
  });
});
