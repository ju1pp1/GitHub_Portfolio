/** @format */
import { afterAll, afterEach, beforeEach, describe, expect, it } from "vitest";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { server, http } from "../../../../mocks/server";
import { setStatus } from "../../statusActions";
import {
  addPlayer,
  removePlayer,
  setPlayers,
  updatePlayer,
} from "../../playersActions";
import { postPlayer } from "../AddPlayer";
import { players } from "../../../../mocks/players";
import {
  clearSelectedPlayer,
  setSelectedPlayer,
} from "../../selectedPlayerActions";
import { getPlayers } from "../ListPlayers.js";
import { getSelectedPlayer } from "../ListPlayer.js";
import {
  deleteSelectedPlayer,
  updateSelectedPlayer,
} from "../SelectedPlayer.js";
import { HttpResponse } from "msw";
import { REQ_STATUS } from "../../../../../cypress/e2e/constants";

REQ_STATUS;
let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
beforeEach(() => {
  store = mockStore({});
});

describe("Testing thunk action creators", () => {
  describe("postPlayer:", () => {
    it("SUCCESS CASE: dispatch setStatus(REQ_STATUS.loading), setStatus(REQ_STATUS.success), addPlayer(expectedResponse) and clearSelectedPlayer()", async () => {
      const expectedBody = {
        name: "New Player",
        isActive: false,
      };
      const expectedResponse = {
        id: players.length + 1,
        name: "New Player",
        isActive: false,
      };
      const expectedActions = [
        setStatus(REQ_STATUS.loading),
        setStatus(REQ_STATUS.success),
        addPlayer(expectedResponse),
        clearSelectedPlayer(),
      ];
      await store.dispatch(postPlayer(expectedBody));
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
    it("FAIL CASE: dispatch setStatus(REQ_STATUS.loading), setStatus(REQ_STATUS.error)", async () => {
      server.use(
        // http.post('**/api/players', (req, res, ctx) => {
        http.post("http://localhost:3001/api/players", () => {
          return HttpResponse.error();
        })
      );
      const expectedBody = {
        name: "New Player",
        isActive: false,
      };
      const expectedActions = [
        setStatus(REQ_STATUS.loading),
        setStatus(REQ_STATUS.error),
      ];
      await store.dispatch(postPlayer(expectedBody));
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });
  describe("getPlayers:", () => {
    it("SUCCESS CASE: dispatch setStatus(REQ_STATUS.loading), setStatus(REQ_STATUS.success), setPlayers(expectedResponse)", async () => {
      const expectedResponse = players.map((player) => ({
        id: player.id,
        name: player.name,
      }));
      const expectedActions = [
        setStatus(REQ_STATUS.loading),
        setStatus(REQ_STATUS.success),
        setPlayers(expectedResponse),
      ];
      await store.dispatch(getPlayers());
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
    it("FAIL CASE: dispatch setStatus(REQ_STATUS.loading), setStatus(REQ_STATUS.success)", async () => {
      server.use(
        http.get("**/api/players", () => {
          return HttpResponse.error();
        })
      );

      const expectedActions = [
        setStatus(REQ_STATUS.loading),
        setStatus(REQ_STATUS.error),
      ];
      await store.dispatch(getPlayers());
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });
  describe("getSelectedPlayer:", () => {
    it("SUCCESS CASE: dispatch setStatus(REQ_STATUS.loading), setStatus(REQ_STATUS.success), setSelectedPlayer(expectedResponse)", async () => {
      const expectedResponse = players[0];
      const expectedActions = [
        setStatus(REQ_STATUS.loading),
        setStatus(REQ_STATUS.success),
        setSelectedPlayer(expectedResponse),
      ];
      await store.dispatch(getSelectedPlayer(expectedResponse.id));
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
    it("FAIL CASE: dispatch setStatus(REQ_STATUS.loading), setStatus(REQ_STATUS.error)", async () => {
      const player = players[0];
      server.use(
        http.get(`**/api/players/:playerId`, () => {
          return HttpResponse.error();
        })
      );

      const expectedActions = [
        setStatus(REQ_STATUS.loading),
        setStatus(REQ_STATUS.error),
      ];
      await store.dispatch(getSelectedPlayer(player.id));
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });
  describe("deleteSelectedPlayer:", () => {
    it("SUCCESS CASE: dispatch setStatus(REQ_STATUS.loading), setStatus(REQ_STATUS.success), removePlayer(selectedPlayer.id), clearSelectedPlayer()", async () => {
      const selectedPlayer = players[0];
      const storeWithPlayer = mockStore({ selectedPlayer });
      const expectedActions = [
        setStatus(REQ_STATUS.loading),
        setStatus(REQ_STATUS.success),
        removePlayer(selectedPlayer.id),
        clearSelectedPlayer(),
      ];
      await storeWithPlayer.dispatch(deleteSelectedPlayer());
      const actualActions = storeWithPlayer.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
    it("FAIL CASE: dispatch setStatus(REQ_STATUS.loading), setStatus(REQ_STATUS.error)", async () => {
      const selectedPlayer = players[0];
      const storeWithPlayer = mockStore({ selectedPlayer });
      server.use(
        http.delete("**/api/players/:playerId", () => {
          return HttpResponse.error();
        })
      );

      const expectedActions = [
        setStatus(REQ_STATUS.loading),
        setStatus(REQ_STATUS.error),
      ];
      await storeWithPlayer.dispatch(deleteSelectedPlayer());
      const actualActions = storeWithPlayer.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });
  describe("updateSelectedPlayer:", () => {
    it("SUCCESS CASE: dispatch setStatus(REQ_STATUS.loading), setStatus(REQ_STATUS.success), updatePlayer(expectedResponse), clearSelectedPlayer()", async () => {
      const selectedPlayer = players[0];
      const storeWithPlayer = mockStore({ selectedPlayer });
      const expectedBody = !selectedPlayer.isActive;
      const expectedResponse = {
        id: selectedPlayer.id,
        name: selectedPlayer.name,
        isActive: !selectedPlayer.isActive,
      };
      const expectedActions = [
        setStatus(REQ_STATUS.loading),
        setStatus(REQ_STATUS.success),
        updatePlayer(expectedResponse),
        clearSelectedPlayer(),
      ];
      await storeWithPlayer.dispatch(updateSelectedPlayer(expectedBody));
      const actualActions = storeWithPlayer.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
    it("FAIL CASE: dispatch setStatus(REQ_STATUS.loading), setStatus(REQ_STATUS.error)", async () => {
      const selectedPlayer = players[0];
      const storeWithPlayer = mockStore({ selectedPlayer });
      const expectedBody = !selectedPlayer.isActive;
      server.use(
        http.put("**/api/players/:playerId", () => {
          return HttpResponse.error();
        })
      );

      const expectedActions = [
        setStatus(REQ_STATUS.loading),
        setStatus(REQ_STATUS.error),
      ];
      await storeWithPlayer.dispatch(
        updateSelectedPlayer(expectedBody.isActive)
      );
      const actualActions = storeWithPlayer.getActions();

      expect(actualActions).toEqual(expectedActions);
    });
  });
});
