/**
 * Implement the actions creators addPlayer, removePlayer, togglePlayerStatus
 */

import * as actions from './actionTypes.js';

/**
 * Get the action object used to dispatch the action for adding a new player
 *
 * The returned action object should have the following structure:
 *
 *   {
 *     type: 'ADD_PLAYER',
 *     payload: {
 *       name: 'Player Name',
 *       isActive: false
 *     }
 *   }
 *
 * The returned object's payload should always have both keys 'name' and 'isActive'.
 *
 * Use the constants from actionTypes.js to define the type value of the
 * returned action object. Don't use the plain string values directly!
 *
 * Example usage:
 *   store.dispatch(addPlayer({name: 'Player name', isActive: true}))
 *
 * @param {object} player new player object
 * @returns {object} action object for adding a new player
 */

//Making action creator for adding a new player
export const addPlayer = (player) => {
    return {
        type: actions.ADD_PLAYER,
        payload: {
            name: player.name,
            isActive: player.isActive
        }
    };
};

/**
 * Get the action object used to dispatch the action for removing a player
 *
 * Id is required and should be integer.
 *
 * The returned action object should have the following structure:
 *
 *   {
 *     type: 'REMOVE_PLAYER',
 *     payload: {
 *       id: 2
 *     }
 *   }
 *
 * Use the constants from actionTypes.js to define the type value of the
 * returned action object. Don't use the plain string values directly!
 *
 * Example usage:
 *   store.dispatch(removePlayer(2));
 *
 * @param {number} id player id (integer)
 * @returns {object} action object for removing a player
 */
export const removePlayer = (id) => {
    return {
        type: actions.REMOVE_PLAYER,
        payload: {
            id: id
        }
    };
};

/**
 * Get the action object used to dispatch the action for changing a player's status
 *
 * Id is required and should be integer.
 *
 * The returned action object should have the following structure:
 *
 *   {
 *     type: 'TOGGLE_PLAYER_STATUS',
 *     payload: {
 *       id: 2
 *     }
 *   }
 *
 * Use the constants from actionTypes.js to define the type value of the
 * returned action object. Don't use the plain string values directly!
 *
 * Example usage:
 *   store.dispatch(togglePlayerStatus(2));
 *
 * @param {number} id player id (integer)
 * @returns {object} action object for changing a player's status
 */
export const togglePlayerStatus = (id) => {
    return {
        type: actions.TOGGLE_PLAYER_STATUS,
        payload: {
            id: id
        }
    };
};
