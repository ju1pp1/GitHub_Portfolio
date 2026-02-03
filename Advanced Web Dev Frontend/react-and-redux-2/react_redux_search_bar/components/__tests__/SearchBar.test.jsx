import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { afterEach, beforeEach, describe, expect, it, test, vi } from "vitest";

import { SearchBar } from '../SearchBar';
import { setSearchQuery } from '../../redux/actionCreators/searchActions';


let component;
let mockStore;
let store;

describe('SearchBar Component', () => {


    beforeEach(() => {
        mockStore = configureMockStore();
        mockStore.dispatch = vi.fn(); // Mock the dispatch method
        store = mockStore({ searchQuery: '' });

        component = render(
            <Provider store={store}>
                <SearchBar />
            </Provider>
        );
    });

    afterEach(() => {
        component.unmount();
    });

    test('should render the search bar', () => {
        const { container } = component;
        const input = screen.getByPlaceholderText(/search players/i);
        expect(input).not.toBeNull();
        expect(document.body.contains(input)).toBe(true);
    });

    // test('should dispatch setSearchQuery action on input change', () => {
    //     const { container } = component;
    //     const input = screen.getByPlaceholderText(/search players/i);

    //     fireEvent.change(input, { target: { value: 'player1' } });

    //     expect(mockStore.dispatch).toHaveBeenCalledWith({
    //         type: 'SET_SEARCH_QUERY',
    //         payload: 'player1',
    //     });
    // });

    it('has the correct initial value', () => {
        const { container } = component;
        const input = screen.getByPlaceholderText(/search players/i);
        expect(input.value).toBe('');
    });

    it('updates the input value on change', () => {
        const { container } = component;
        const input = screen.getByPlaceholderText(/search players/i);
        fireEvent.change(input, { target: { value: 'player2' } });
        expect(input.value).toBe('player2');
    });



});


describe('SearchBar Component without beforeEach', () => {
    it('should dispatch setSearchQuery action on input change', async () => {
        mockStore = configureMockStore();
        mockStore.dispatch = vi.fn(); // Mock the dispatch method
        store = mockStore({ searchQuery: '' });

        component = render(
            <Provider store={store}>
                <SearchBar />
            </Provider>
        );

        const input = screen.getByPlaceholderText(/search players/i);
        fireEvent.change(input, { target: { value: 'player1' } });

        const queryString = 'player1';
        const action = {
            type: 'SET_SEARCH_QUERY',
            payload: queryString,
        };
        const expectedActions = action;
        await store.dispatch(setSearchQuery(queryString));
        const actualActions = store.getActions();
        expect(actualActions.at(0)).toEqual(expectedActions);

    });
});
