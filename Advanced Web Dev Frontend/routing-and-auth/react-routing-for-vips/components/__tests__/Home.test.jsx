import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, test, vi, afterEach } from "vitest";
import Home from '../Home';

describe('Home component', () => {
    afterEach(() => {
        cleanup();
    });

    test('renders Home component correctly', () => {
        render(
            <Router>
                <Home />
            </Router>
        );

        // Check if the heading is rendered
        const headingElement = screen.getByText(/Home Page/i);
        expect(headingElement).toBeTruthy();

        // Check if the paragraph is rendered
        const paragraphElement = screen.getByText(/The shortest route takes us Home/i);
        expect(paragraphElement).not.toBeNull();
    });

    test('has correct container class', () => {
        const { container } = render(
            <Router>
                <Home />
            </Router>
        );

        // ✅ Replace .toHaveClass() with classList.contains()
        expect(container.firstChild.classList.contains('container')).toBeTruthy();
    });

    test('renders navigation links correctly', () => {
        render(
            <Router>
                <Home />
            </Router>
        );

        // Check if the register link is rendered
        const registerLink = screen.getByText(/registering/i);
        expect(registerLink).not.toBeNull();
        expect(registerLink.getAttribute('href')).toBe('/register'); // ✅ Replace .toHaveAttribute()

        // Check if the login link is rendered
        const loginLink = screen.getByText(/login/i);
        expect(loginLink).not.toBeNull();
        expect(loginLink.getAttribute('href')).toBe('/login'); // ✅ Replace .toHaveAttribute()
    });
});
