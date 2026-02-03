/** @format REDUCERS*/

import { SET_PLAYERS } from '../constants';

/**
 * @description reducer for players that returns the players ids and names in an array. The default state is an empty array. The action types are SET_PLAYERS, 
 * - SET_PLAYERS action returns the payload that includes players. 

 * @param {*} state - The players in an array.
 * @param {*} action - The action to be performed.
 * @returns {Array} - The players in an array.
 */
const playersReducer = (state = [], action) => {
	switch (action.type) {
		case SET_PLAYERS:
			return action.payload;
		default:
			return state;
	}
};

export default playersReducer;
