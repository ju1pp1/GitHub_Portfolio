import { describe, it, expect, beforeEach, vi } from "vitest";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { fetchPosts, rootReducer } from "../store";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Redux Store", () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            lastVisitedPages: [],
            posts: [],
            loading: false,
            error: null,
        });
    });

    it("should handle TRACK_PAGE action", () => {
        const action = { type: "TRACK_PAGE", payload: "/home" };
        const expectedState = { ...store.getState(), lastVisitedPages: ["/home"] };

        store.dispatch(action);
        const actions = store.getActions();
        expect(actions).toEqual([action]);
        expect(rootReducer(store.getState(), action)).toEqual(expectedState);
    });

    it("should handle FETCH_POSTS_SUCCESS action", () => {
        const action = { type: "FETCH_POSTS_SUCCESS", payload: [{ id: 1, title: "Post 1" }] };
        const expectedState = { ...store.getState(), loading: false, posts: action.payload };

        store.dispatch(action);
        const actions = store.getActions();
        expect(actions).toEqual([action]);
        expect(rootReducer(store.getState(), action)).toEqual(expectedState);
    });

     it("should handle FETCH_POSTS_FAILURE action", () => {
        const action = { type: "FETCH_POSTS_FAILURE", payload: "Error fetching posts" };
        const expectedState = { ...store.getState(), loading: false, error: action.payload };

        store.dispatch(action);
        const actions = store.getActions();
        expect(actions).toEqual([action]);
        expect(rootReducer(store.getState(), action)).toEqual(expectedState);
    });

     it("should dispatch fetchPosts thunk", async () => {
        const expectedActions = [
            { type: "FETCH_POSTS_REQUEST" },
            { type: "FETCH_POSTS_SUCCESS", payload: [{ id: 1, title: "Post 1" }] },
        ];

        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([{ id: 1, title: "Post 1" }]),
            })
        );

        await store.dispatch(fetchPosts());
        expect(store.getActions()).toEqual(expectedActions);
    });
});