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
            lastVisitedPages: [],
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

    test("renders navigation links ", () => {
        store = mockStore({
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

        expect(getByText("Posts")).not.toBeNull();
        expect(getByText("About")).not.toBeNull();
        expect(getByText("Home")).not.toBeNull();

    });
});
