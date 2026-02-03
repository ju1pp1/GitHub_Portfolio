import selectedPlayerReducer from '../selectedPlayerReducer';
import { CLEAR_SELECTED_PLAYER, SET_SELECTED_PLAYER } from '../../constants';
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

describe('selectedPlayerReducer', () => {
    it('should return the initial state', () => {
        expect(selectedPlayerReducer(undefined, {})).toEqual({});
    });

    it('should handle SET_SELECTED_PLAYER', () => {
        const player = { id: 1, name: 'Player 1' };
        const action = {
            type: SET_SELECTED_PLAYER,
            payload: player,
        };
        expect(selectedPlayerReducer({}, action)).toEqual(player);
    });

    it('should handle CLEAR_SELECTED_PLAYER', () => {
        const initialState = { id: 1, name: 'Player 1' };
        const action = {
            type: CLEAR_SELECTED_PLAYER,
        };
        expect(selectedPlayerReducer(initialState, action)).toEqual({});
    });

    it('should return the current state when action type is unknown', () => {
        const initialState = { id: 1, name: 'Player 1' };
        const action = {
            type: 'UNKNOWN_ACTION',
        };
        expect(selectedPlayerReducer(initialState, action)).toEqual(initialState);
    });
});