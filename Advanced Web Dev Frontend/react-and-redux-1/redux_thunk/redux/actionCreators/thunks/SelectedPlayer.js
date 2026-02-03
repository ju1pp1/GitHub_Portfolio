/** @format THUNK*/

import { setStatus } from '../../../redux/actionCreators/statusActions.js';
import { removePlayer, updatePlayer } from '../../../redux/actionCreators/playersActions.js';
import { clearSelectedPlayer, setSelectedPlayer } from '../../../redux/actionCreators/selectedPlayerActions.js';
import { REQ_STATUS } from '../../../../cypress/e2e/constants';
import { useSelector } from 'react-redux';

const API_URL = "http://localhost:3001/api/players";

/**
 * @description thunk for deleting the selected player.
 * Upon starting, Dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - removePlayer-action with selectedPlayer.id as param
 * - clearSelectedPlayer-action with no parameters
 *
 *  Else Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @return {Function} - thunk with dispatch as param
 *
 * Hint: You have to get the required details of the selected player from the store.
 */
export const deleteSelectedPlayer = () => {
    return async (dispatch, getState) => {
        const selectedPlayer = getState().selectedPlayer;
        if(!selectedPlayer || !selectedPlayer.id) return;

        dispatch(setStatus(REQ_STATUS.loading));
        try {
            const response = await fetch(`${API_URL}/${selectedPlayer.id}`, { method: "DELETE"});
            if(!response.ok) throw new Error("Failed to delete player");

            dispatch(setStatus(REQ_STATUS.success));
            dispatch(removePlayer(selectedPlayer.id));
            dispatch(clearSelectedPlayer());
        } catch(error) {
            console.error(error);
            dispatch(setStatus(REQ_STATUS.error));
        }
    };
};

/**
 * @description thunk for updating the selected player.
 * Upon starting, Dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - updatePlayer-action with updated player as param
 * - clearSelectedPlayer-action with no parameters
 * Else Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @param {Boolean} updatedActivity - the new activity status of the player
 * @return {Function} - thunk with dispatch as param
 * @example
 * // returns a thunk that updates the selected player's activity status to false:
 * updateSelectedPlayer(false)
 * // returns a thunk that updates the selected player's activity status to true:
 * updateSelectedPlayer(true)
 *
 * Hint: You have to get required details of the selected player from the store.
 *
 */
export const updateSelectedPlayer = (updatedActivity) => {
    return async (dispatch, getState) => {
        const selectedPlayer = getState().selectedPlayer;
        if(!selectedPlayer || !selectedPlayer.id) return;

        dispatch(setStatus(REQ_STATUS.loading));
        try {
            const updatedPlayer = { ...selectedPlayer, isActive: updatedActivity};
            const response = await fetch(`${API_URL}/${selectedPlayer.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(updatedPlayer),
            });
            if(!response.ok) throw new Error("Failed to update player");

            dispatch(setStatus(REQ_STATUS.success));
            dispatch(updatePlayer(updatedPlayer));
            dispatch(clearSelectedPlayer());
        } catch(error) {
            console.error(error);
            dispatch(setStatus(REQ_STATUS.error));
        }
    };
};
