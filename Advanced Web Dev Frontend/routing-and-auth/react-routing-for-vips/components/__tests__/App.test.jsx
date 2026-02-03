import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import App from "../../App";

const mockStore = configureStore([]);

describe("App Component", () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            user: null,
            lastVisitedPages: [], // ✅ Ensure required properties exist
            posts: [],
            loading: false,
            error: null,
        });
    });

    afterEach(() => {
        cleanup(); 
    });

    test("renders without crashing", () => {
        render(
            <Provider store={store}>
                <App router={MemoryRouter} />
            </Provider>
        );
    });

    test("renders AppContent component", () => {
        const { getByText } = render(
            <Provider store={store}>
                <App router={MemoryRouter} />
            </Provider>
        );

        expect(getByText("Home")).not.toBeNull(); // ✅ Replace toBeInTheDocument
        expect(getByText("About")).not.toBeNull();
    });

    test("renders navigation links for unauthenticated user", () => {
        const { getByText } = render(
            <Provider store={store}>
                <App router={MemoryRouter} />
            </Provider>
        );

        expect(getByText("Register")).not.toBeNull();
        expect(getByText("Login")).not.toBeNull();
    });

    test("renders navigation links for authenticated user", () => {
        store = mockStore({
            user: { name: "Test User" },
            lastVisitedPages: [],
            posts: [],
            loading: false,
            error: null,
        });

        const { getByText } = render(
            <Provider store={store}>
                <App router={MemoryRouter} />
            </Provider>
        );

        expect(getByText("VIP Area")).not.toBeNull();
        expect(getByText("VIP Posts")).not.toBeNull();
        expect(getByText("Logout")).not.toBeNull();
    });
});
