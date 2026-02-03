import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { afterEach, beforeEach, describe, expect, it, test, vi } from "vitest";
import Register from "../Register";

const mockStore = configureStore([]);

describe("Register Component", () => {
    let store;

    beforeEach(() => {
        store = mockStore({});
    });

    afterEach(() => {
        vi.restoreAllMocks();
        localStorage.clear();
        cleanup();
    });

    test("renders Register component", () => {
        render(
            <Provider store={store}>
                <Router>
                    <Register />
                </Router>
            </Provider>
        );

        expect(screen.getByText("Register a new user")).toBeTruthy();
    });

    test("allows user to input username and password", () => {
        render(
            <Provider store={store}>
                <Router>
                    <Register />
                </Router>
            </Provider>
        );

        const usernameInput = screen.getByPlaceholderText("Username");
        const passwordInput = screen.getByPlaceholderText("Password");

        fireEvent.change(usernameInput, { target: { value: "testuser" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });

        expect(usernameInput.value).toBe("testuser");
        expect(passwordInput.value).toBe("password123");
    });

    test("handles registration and navigation", () => {
        render(
            <Provider store={store}>
                <Router>
                    <Register />
                </Router>
            </Provider>
        );

        const usernameInput = screen.getByPlaceholderText("Username");
        const passwordInput = screen.getByPlaceholderText("Password");
        const registerButton = screen.getByText("Register");

        fireEvent.change(usernameInput, { target: { value: "testuser" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.click(registerButton);

        expect(localStorage.getItem("user")).toBe(JSON.stringify({ username: "testuser", password: "password123" }));
        expect(store.getActions()).toEqual([{ type: "LOGIN", payload: { username: "testuser" } }]);
    });
});