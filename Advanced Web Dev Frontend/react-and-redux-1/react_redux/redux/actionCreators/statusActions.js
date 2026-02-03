/** @format NORMAL ACTION CREATORS */

// STATUS ACTION CREATORS

import { SET_REQUEST_STATUS } from '../constants';

/**
 * @description a normal action creator that returns an action with type SET_REQUEST_STATUS to the frontends reducers along with the payload that includes status.
 * @param {String} status - The request status that is to be stored in state
 * @return {Object} action
 */
export const setStatus = (status) => ({
    type: SET_REQUEST_STATUS,
    payload: status
});
