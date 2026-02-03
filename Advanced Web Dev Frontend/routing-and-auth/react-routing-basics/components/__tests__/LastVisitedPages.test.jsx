import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { afterEach, beforeEach, describe, expect, it, test, vi } from "vitest";
import LastVisitedPages from '../LastVisitedPages';

const mockStore = configureStore([]);

describe('LastVisitedPages Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            lastVisitedPages: ['/home', '/about', '/contact']
        });
    });

    afterEach(() => {
        cleanup();
    });

    it('should render without crashing', () => {
        render(
            <Provider store={store}>
                <Router>
                    <LastVisitedPages />
                </Router>
            </Provider>
        );
    });

    it('should display the correct number of links', () => {
        const { getAllByRole } = render(
            <Provider store={store}>
                <Router>
                    <LastVisitedPages />
                </Router>
            </Provider>
        );

        const links = getAllByRole('link');
        expect(links.length).toBe(3); // ✅ Replace .toHaveLength()
    });

    it('should display the correct links', () => {
        const { getByText } = render(
            <Provider store={store}>
                <Router>
                    <LastVisitedPages />
                </Router>
            </Provider>
        );

        expect(getByText('/home')).not.toBeNull(); // ✅ Replace .toBeInTheDocument()
        expect(getByText('/about')).not.toBeNull();
        expect(getByText('/contact')).not.toBeNull();
    });
});
