/** @format REDUCERS*/

import { LOADING, SET_REQUEST_STATUS } from "../constants";
import { REQ_STATUS } from "../../../cypress/e2e/constants";

// This is the default state

/**
 * @description reducer for status that returns the status of the request. The default state is 'Loading...'. The action type is SET_REQUEST_STATUS.
 * - SET_REQUEST_STATUS action returns the payload that includes the status of the request.
 * - default action returns the state
 * @param {*} state  - The status of the request
 * @param {*} action  - The action to be performed.
 * @returns  {String} - The status of the request
 */
const statusReducer = (state = REQ_STATUS.loading, action) => {
  switch (action.type) {
    case SET_REQUEST_STATUS:
      return action.payload;
    default:
      return state;
  }
};

export default statusReducer;
