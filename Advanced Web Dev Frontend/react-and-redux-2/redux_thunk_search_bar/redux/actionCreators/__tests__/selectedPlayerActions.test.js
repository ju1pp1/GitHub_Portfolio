import { setSelectedPlayer, clearSelectedPlayer } from '../selectedPlayerActions';
import { SET_SELECTED_PLAYER, CLEAR_SELECTED_PLAYER } from '../../constants';
import { describe, expect, it } from 'vitest';


describe('selectedPlayerActions', () => {
    it('should create an action to set selected player', () => {
        const player = { id: 1, name: 'Player 1' };
        const expectedAction = {
            type: SET_SELECTED_PLAYER,
            payload: player,
        };
        expect(setSelectedPlayer(player)).toEqual(expectedAction);
    });

    it('should create an action to clear selected player', () => {
        const expectedAction = {
            type: CLEAR_SELECTED_PLAYER,
        };
        expect(clearSelectedPlayer()).toEqual(expectedAction);
    });
});