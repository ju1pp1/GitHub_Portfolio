/** @format THUNK*/
import { setStatus } from '../../../redux/actionCreators/statusActions'
import { setPlayers } from '../playersActions';
import { REQ_STATUS } from '../../../../cypress/e2e/constants';
const API_URL = "http://localhost:3001/api/players";
/**
 * @description thunk for getting all players.
 * Whenever called, dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - setPlayers-action with response array as param
 * If Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @return {Function} - thunk with dispatch as param
 */
export const getPlayers = () => {
    return async (dispatch) => {
        dispatch(setStatus(REQ_STATUS.loading));
        try {
            const response = await fetch(API_URL);
            if(!response.ok) throw new Error("Failed to fetch players");

            const data = await response.json();
            dispatch(setPlayers(data));
            dispatch(setStatus(REQ_STATUS.success));
        } catch(error) {
            console.error(error);
            dispatch(setStatus(REQ_STATUS.error));
        }
    };
};
