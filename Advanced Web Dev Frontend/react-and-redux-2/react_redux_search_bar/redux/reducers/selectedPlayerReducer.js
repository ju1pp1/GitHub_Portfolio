/** @format REDUCERS*/

import { CLEAR_SELECTED_PLAYER, SET_SELECTED_PLAYER } from '../constants';

/**
 * @description reducer for selectedPlayer that returns the selected player. The default state is an empty object. The action types are SET_SELECTED_PLAYER and CLEAR_SELECTED_PLAYER.
 * - SET_SELECTED_PLAYER action sets the selected player as the state.
 * - CLEAR_SELECTED_PLAYER action clears the state
 * - default action returns the state
 *
 * @param {*} state  - The selected player
 * @param {*} action - The action to be performed.
 * @returns {Object} - The selected player
 */
const selectedPlayerReducer = (state = {}, action) => {
	switch (action.type) {
		case SET_SELECTED_PLAYER:
			return action.payload;
		case CLEAR_SELECTED_PLAYER:
			return {};
		default:
			return state;
	}
};

export default selectedPlayerReducer;
