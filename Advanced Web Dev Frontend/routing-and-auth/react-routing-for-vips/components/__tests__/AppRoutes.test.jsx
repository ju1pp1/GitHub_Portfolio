import { render, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import AppRoutes from "../../AppRoutes";

const mockStore = configureStore([thunk]);

describe("AppRoutes", () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            user: null,
            lastVisitedPages: [],
            posts: [],
            loading: false,
            error: null,
        });
        
    });

    afterEach(() => {
        cleanup();
    });

    test('renders About component for "/about" route', () => {
        const { getByText } = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/about"]}>
                    <AppRoutes />
                </MemoryRouter>
            </Provider>
        );

        expect(getByText("About Page")).not.toBeNull();
    });

    test('redirects to Login component from "/vip" route when user is not logged in', () => {
        const { getByText } = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/vip"]}>
                    <AppRoutes />
                </MemoryRouter>
            </Provider>
        );

        expect(getByText("Login Page")).not.toBeNull();
    });

    test('renders VIPArea component for "/vip" route when user is logged in', () => {
        store = mockStore({
            user: { name: "Test User" },
            lastVisitedPages: [],
            posts: [],
            loading: false,
            error: null,
        });

        const { getByText } = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/vip"]}>
                    <AppRoutes />
                </MemoryRouter>
            </Provider>
        );
        expect(getByText("VIP Area")).not.toBeNull();
    });

    test('redirects to Login component for "/vip/posts" route when user is not logged in', () => {
        const { getByText } = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/vip"]}>
                    <AppRoutes />
                </MemoryRouter>
            </Provider>
        );

        expect(getByText("Login Page")).not.toBeNull();
    });

    test('renders Posts component for "/vip/posts" route when user is logged in', () => {
        store = mockStore({
            user: { name: "Test User" },
            lastVisitedPages: [],
            posts: [],
            loading: false,
            error: null,
        });

        const { getByText } = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/vip/posts"]}>
                    <AppRoutes />
                </MemoryRouter>
            </Provider>
        );

        expect(getByText("VIP Posts")).not.toBeNull();
    });

    test('renders NotFound component for undefined routes', () => {
        const { getByText } = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/undefined-route"]}>
                    <AppRoutes />
                </MemoryRouter>
            </Provider>
        );

        expect(getByText("404 - Page Not Found")).not.toBeNull();
    });
});