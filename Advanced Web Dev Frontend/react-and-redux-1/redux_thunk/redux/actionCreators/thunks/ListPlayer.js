/** @format THUNK*/
import { setStatus } from '../../../redux/actionCreators/statusActions'
import { setSelectedPlayer } from '../selectedPlayerActions';
import { REQ_STATUS } from '../../../../cypress/e2e/constants';
const API_URL = "http://localhost:3001/api/players";
/**
 * @description thunk for getting the selected player.
 * Upon starting, Dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - setSelectedPlayer-action with player-object as param
 *  Else Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @param {Number | String} id - id of the player
 * @return {Function} - thunk
 */
export const getSelectedPlayer = (id) => {
    return async (dispatch) => {
        dispatch(setStatus(REQ_STATUS.loading));
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if(!response.ok) throw new Error("Failed to fetch player");

            const player = await response.json();
            dispatch(setSelectedPlayer(player));
            dispatch(setStatus(REQ_STATUS.success));
        } catch(error) {
            console.error(error);
            dispatch(setStatus(REQ_STATUS.error));
        }
    };
};
