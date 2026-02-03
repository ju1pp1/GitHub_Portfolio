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


        // Check if the about link is rendered
        const aboutLink = screen.getByText(/about page/i);
        expect(aboutLink).not.toBeNull();
        expect(aboutLink.getAttribute('href')).toBe('/about'); 

        // Check if the posts link is rendered
        const postsLink = screen.getByText(/posts/i);
        expect(postsLink).not.toBeNull();
        expect(postsLink.getAttribute('href')).toBe('/posts'); // ✅ Replace .toHaveAttribute()
    });
});
