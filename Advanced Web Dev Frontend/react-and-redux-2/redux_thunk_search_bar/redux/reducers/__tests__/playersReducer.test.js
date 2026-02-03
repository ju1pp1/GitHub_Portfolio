import playersReducer from '../playersReducer';
import { SET_PLAYERS, SET_FILTERED_PLAYERS } from '../../constants';
import { afterAll, afterEach, beforeEach, describe, expect, it } from "vitest";

import { players } from "../../../mocks/players";
import {
  ADD_PLAYER,
  CLEAR_SELECTED_PLAYER,
  REMOVE_PLAYER,
  SET_PLAYERS,
  SET_REQUEST_STATUS,
  SET_SELECTED_PLAYER,
} from "../../constants";


describe('playersReducer', () => {
    const initialState = {
        players: [],
        filteredPlayers: [],
    };

    it('should return the initial state', () => {
        expect(playersReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle SET_PLAYERS', () => {
        const players = [{ id: 1, name: 'Player 1' }, { id: 2, name: 'Player 2' }];
        const action = {
            type: SET_PLAYERS,
            payload: players,
        };
        const expectedState = {
            players: players,
            filteredPlayers: players,
        };
        expect(playersReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_FILTERED_PLAYERS', () => {
        const filteredPlayers = [{ id: 1, name: 'Player 1' }];
        const action = {
            type: SET_FILTERED_PLAYERS,
            payload: filteredPlayers,
        };
        const expectedState = {
            players: [],
            filteredPlayers: filteredPlayers,
        };
        expect(playersReducer(initialState, action)).toEqual(expectedState);
    });
});