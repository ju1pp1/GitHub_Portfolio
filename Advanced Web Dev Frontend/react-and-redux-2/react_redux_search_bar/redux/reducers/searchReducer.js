/**
 * @description Reducer function for handling search queries. 
 * It updates the state with the search query string.
 * The default state is an empty string. 
 * The action type handled is SET_SEARCH_QUERY.
 * 
 * @param {string} state - The current search query state.
 * @param {Object} action - The action to be performed.
 * @param {string} action.type - The type of action being performed.
 * @param {string} action.payload - The new search query string.
 * @returns {string} - The updated search query state.
 */

import { SET_SEARCH_QUERY } from "../constants";

const initialState = '';

const searchReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SEARCH_QUERY:
			return action.payload;
		default:
			return state;
	}
};

export default searchReducer;