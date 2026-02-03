/** @format NORMAL ACTION CREATORS
 * These are the action creators that are used in the thunks.

*/

import { SET_PLAYERS } from '../constants';
/**
 * @description normal action creator that returns an action with type SET_PLAYERS to the frontends reducers along with the payload that includes players.
 * @param {Array} players - The players ids and names in an array.
 * @return {Object} action
 */
export const setPlayers = (players) => ({
    type: SET_PLAYERS,
    payload: players
});
