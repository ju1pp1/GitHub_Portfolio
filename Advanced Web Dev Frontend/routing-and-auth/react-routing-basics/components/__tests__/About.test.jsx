import React from 'react';
import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, test, vi } from "vitest";
import About from '../About';

describe('About component', () => {
    // Reset the testing environment before each test
    beforeEach(() => {
        vi.resetModules();
    });

    test('renders About component', () => {
        render(<About />);
        expect(screen.getByText('About Page')).not.toBeNull();
        expect(screen.getByText('A small React Router exercise for your education and enjoyment.')).not.toBeNull();
    });
});