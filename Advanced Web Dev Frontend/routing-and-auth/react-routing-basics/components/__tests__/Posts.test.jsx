import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { afterEach, beforeEach, describe, expect, it, test, vi } from "vitest";
import Posts from '../Posts';
import { fetchPosts } from '../../redux/store';

// ✅ Setup redux-mock-store with thunk middleware
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// ✅ Properly mock fetchPosts for Vitest
vi.mock("../../redux/store", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    fetchPosts: vi.fn(() => async (dispatch) => { // ✅ Simulate async thunk
      dispatch({ type: "FETCH_POSTS_REQUEST" });
    }),
  };
});

describe('Posts Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            user: null,
            posts: [],
            loading: false,
            error: null,
        });

        store.dispatch = vi.fn(); // ✅ Mock dispatch function
    });

    afterEach(() => {
        vi.restoreAllMocks();
        cleanup();
    });


    test('dispatches fetchPosts action on mount', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Posts />
                </BrowserRouter>
            </Provider>
        );

        expect(fetchPosts).toHaveBeenCalled(); 
    });

    test('displays loading message when loading', () => {
        store = mockStore({
            posts: [],
            loading: true,
            error: null,
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Posts />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText(/Loading posts.../i)).not.toBeNull(); // ✅ Fix `.toBeInTheDocument()`
    });

    test('displays error message when there is an error', () => {
        store = mockStore({
            posts: [],
            loading: false,
            error: 'Failed to fetch posts',
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Posts />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText(/Error: Failed to fetch posts/i)).not.toBeNull();
    });

    test('displays posts when data is available', () => {
        store = mockStore({
            posts: [
                { id: 1, title: 'Post 1', body: 'Content 1' },
                { id: 2, title: 'Post 2', body: 'Content 2' },
            ],
            loading: false,
            error: null,
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Posts />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText(/New Posts/i)).not.toBeNull();
        expect(screen.getByText(/Title: Post 1/i)).not.toBeNull();
        expect(screen.getByText(/Content: Content 1/i)).not.toBeNull();
        expect(screen.getByText(/Title: Post 2/i)).not.toBeNull();
        expect(screen.getByText(/Content: Content 2/i)).not.toBeNull();
    });
});
