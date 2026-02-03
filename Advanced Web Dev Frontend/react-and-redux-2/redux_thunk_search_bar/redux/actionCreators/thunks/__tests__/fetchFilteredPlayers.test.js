import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchFilteredPlayers } from '../fetchFilteredPlayers';
import { SET_FILTERED_PLAYERS } from '../../../constants';
import { afterAll, afterEach, beforeEach, describe, expect, it } from "vitest";


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetchFilteredPlayers', () => {
    it('should dispatch SET_FILTERED_PLAYERS with filtered players', async () => {
        const initialState = {
            players: {
                players: [
                    { name: 'John Doe' },
                    { name: 'Jane Smith' },
                    { name: 'Alice Johnson' },
                ],
            },
        };
        const store = mockStore(initialState);
        const searchTerm = 'Jane';

        await store.dispatch(fetchFilteredPlayers(searchTerm));

        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: SET_FILTERED_PLAYERS,
            payload: [{ name: 'Jane Smith' }],
        });
    });

    it('should dispatch SET_FILTERED_PLAYERS with an empty array if no players match', async () => {
        const initialState = {
            players: {
                players: [
                    { name: 'John Doe' },
                    { name: 'Jane Smith' },
                    { name: 'Alice Johnson' },
                ],
            },
        };
        const store = mockStore(initialState);
        const searchTerm = 'Bob';

        await store.dispatch(fetchFilteredPlayers(searchTerm));

        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: SET_FILTERED_PLAYERS,
            payload: [],
        });
    });
});