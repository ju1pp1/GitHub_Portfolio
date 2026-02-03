import { setPlayers, addPlayer, removePlayer, updatePlayer } from '../playersActions';
import { SET_PLAYERS, ADD_PLAYER, REMOVE_PLAYER, UPDATE_PLAYER } from '../../constants';
import { describe, expect, it } from 'vitest';

describe('playersActions', () => {
    it('should create an action to set players', () => {
        const players = [{ id: '1', name: 'Player 1' }, { id: '2', name: 'Player 2' }];
        const expectedAction = {
            type: SET_PLAYERS,
            payload: players,
        };
        expect(setPlayers(players)).toEqual(expectedAction);
    });

    it('should create an action to add a player', () => {
        const player = { id: '1', name: 'Player 1' };
        const expectedAction = {
            type: ADD_PLAYER,
            payload: player,
        };
        expect(addPlayer(player)).toEqual(expectedAction);
    });

    it('should create an action to remove a player', () => {
        const playerId = '1';
        const expectedAction = {
            type: REMOVE_PLAYER,
            payload: { id: playerId },
        };
        expect(removePlayer(playerId)).toEqual(expectedAction);
    });

    it('should create an action to update a player', () => {
        const player = { id: '1', name: 'Updated Player 1' };
        const expectedAction = {
            type: UPDATE_PLAYER,
            payload: player,
        };
        expect(updatePlayer(player)).toEqual(expectedAction);
    });
});