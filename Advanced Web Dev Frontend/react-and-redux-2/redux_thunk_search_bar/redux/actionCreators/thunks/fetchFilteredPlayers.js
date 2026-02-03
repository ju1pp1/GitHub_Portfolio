/** @format */

import { useSelector } from "react-redux";
/** @format
 * @description
 * 
 * 
 * 
 * Student instructions:
 * 
 * To implement the fetchFilteredPlayers functionality correctly, follow these steps:
 * 
 * 1. Create an exported function named fetchFilteredPlayers that accepts a searchTerm as its parameter. This function will be responsible for filtering players based on the provided search term
 * 
 * 2.  The function should return an asynchronous thunk function. This allows the function to perform asynchronous operations, such as filtering or making API calls, before dispatching an action.
 * 
 * 3. Use the getState parameter within the thunk function to access the current state of the Redux store. Specifically, retrieve the list of players from the state.
 * 
 * 4. Filter Players, implement logic to filter the players based on the searchTerm. This involves matching the search term against player names in a case-insensitive manner.
 * 
 * 5. Simulate an API Call - simulate an asynchronous operation (e.g., an API call) using a delay.
 *  Something like
 *      await new Promise((resolve) => setTimeout(resolve, 300));
 *  will do nicely here.
 * 
 * 6. Dispatch an Action - after obtaining the filtered list of players, 
 * dispatch an action to update the state. The action should include the filtered 
 * players as the payload and use the appropriate action type constant of SET_FILTERED_PLAYERS.
 * 
*/

import { SET_FILTERED_PLAYERS } from "../../constants";

export const fetchFilteredPlayers = (searchTerm) => {
    return async (dispatch, getState) => {
        const players = getState().players.players; // Access current players
        const filteredPlayers = players.filter((player) =>
            player.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        // Simulate an async operation (e.g., API call)
        await new Promise((resolve) => setTimeout(resolve, 300));
        dispatch({
            type: SET_FILTERED_PLAYERS,
            payload: filteredPlayers,
        });
    };
};