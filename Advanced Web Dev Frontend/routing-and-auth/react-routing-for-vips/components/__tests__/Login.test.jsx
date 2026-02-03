import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import Login from '../Login';

// mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useNavigate: () => mockNavigate, // Ensure useNavigate returns a function
    };
});

// ✅ Mock Redux's useDispatch
const mockDispatch = vi.fn();
vi.mock('react-redux', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useDispatch: () => mockDispatch,
    };
});

const mockStore = configureStore([]);

describe('Login Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({});
    });

    afterEach(() => {
        vi.restoreAllMocks(); // ✅ Reset mocks to avoid test pollution
        localStorage.clear();
        cleanup();
    });

    test('renders Login component', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Login />
                </Router>
            </Provider>
        );

        expect(screen.getByText('Login Page')).not.toBeNull();
        expect(screen.getByPlaceholderText('Username')).not.toBeNull();
        expect(screen.getByPlaceholderText('Password')).not.toBeNull();
        expect(screen.getByText('Login')).not.toBeNull();
    });

    test('successful login navigates to /vip', () => {
        localStorage.setItem('user', JSON.stringify({ username: 'testuser', password: 'testpass' }));

        render(
            <Provider store={store}>
                <Router>
                    <Login />
                </Router>
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'testpass' } });
        fireEvent.click(screen.getByText('Login'));

        expect(mockDispatch).toHaveBeenCalledWith({ type: 'LOGIN', payload: { username: 'testuser' } });
        expect(mockNavigate).toHaveBeenCalledWith('/vip'); // ✅ Fix: navigate is now correctly mocked
    });

    test('unsuccessful login shows alert', () => {
        vi.spyOn(window, 'alert').mockImplementation(() => {}); // ✅ Prevent alert popup in tests

        render(
            <Provider store={store}>
                <Router>
                    <Login />
                </Router>
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'wronguser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpass' } });
        fireEvent.click(screen.getByText('Login'));

        expect(window.alert).toHaveBeenCalledWith('Invalid username or password');
        expect(mockNavigate).not.toHaveBeenCalled();
        expect(mockDispatch).not.toHaveBeenCalled();
    });
});
