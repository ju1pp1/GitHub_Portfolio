/**
 * @description normal action creator that 
 * returns an action with type SET_SEARCH_QUERY to the frontends reducers 
 * along with the payload that includes query.
 * @param {String} query - The query that is to be stored in state
 * @return {Object} action
 */

import { SET_SEARCH_QUERY } from "../constants";

export const setSearchQuery = (query) => ({
    type: SET_SEARCH_QUERY,
    payload: query
});


