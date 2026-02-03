/** @format STORE
 * @description The store is the object that brings together the reducers and the actions. It is the single source of truth for the state of the app.
 */

// Redux library for creating the store
import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// Redux-devtools extension library for Chrome and Firefox
import { composeWithDevTools } from "@redux-devtools/extension";

// Reducers
import selectedPlayerReducer from "./reducers/selectedPlayerReducer";
import playersReducer from "./reducers/playersReducer";
import statusReducer from "./reducers/statusReducer";

/**
 * @description combines all reducers into one reducer
 * @param {*} selectedPlayer - The selected player
 * @param {*} players - The players in an array.
 * @param {*} status - The status of the app.
 * @returns {Object} - The combined reducers
 */
export const reducers = combineReducers({
  selectedPlayer: selectedPlayerReducer,
  players: playersReducer,
  status: statusReducer,
});

/**
 * @description creates the store
 * @param {*} reducers - The combined reducers
 * @param {*} composeWithDevTools - The redux-devtools extension library for Chrome and Firefox
 * @param {*} applyMiddleware - The redux library for applying middleware
 * @param {*} thunk - The redux library for asynchronous actions
 * @returns {Object} - The store
 * @see https://redux.js.org/api/createstore
 * @see https://redux.js.org/api/compose
 * @see https://redux.js.org/api/applymiddleware
 */
export default legacy_createStore(
  reducers,
  undefined,
  composeWithDevTools(applyMiddleware(thunk))
);
