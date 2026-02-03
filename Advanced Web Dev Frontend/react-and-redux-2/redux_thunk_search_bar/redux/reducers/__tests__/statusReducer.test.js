import statusReducer from '../statusReducer';
import { SET_REQUEST_STATUS } from '../../constants';
import { REQ_STATUS } from '../../../../cypress/e2e/constants';

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

describe('statusReducer', () => {
    it('should return the default state', () => {
        const initialState = REQ_STATUS.loading;
        const action = { type: 'UNKNOWN_ACTION' };
        const newState = statusReducer(undefined, action);
        expect(newState).toBe(initialState);
    });

    it('should handle SET_REQUEST_STATUS', () => {
        const action = {
            type: SET_REQUEST_STATUS,
            payload: REQ_STATUS.success,
        };
        const newState = statusReducer(undefined, action);
        expect(newState).toBe(REQ_STATUS.success);
    });

    it('should return the current state when action type is unknown', () => {
        const currentState = REQ_STATUS.error;
        const action = { type: 'UNKNOWN_ACTION' };
        const newState = statusReducer(currentState, action);
        expect(newState).toBe(currentState);
    });
});