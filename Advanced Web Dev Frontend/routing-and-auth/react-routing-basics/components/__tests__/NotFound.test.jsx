import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from "vitest";
import NotFound from '../NotFound';

describe('NotFound component', () => {
    test('renders 404 error message', () => {
        render(<NotFound />);
        
        expect(screen.getByText('404 - Page Not Found')).not.toBeNull(); // ✅ Replace toBeInTheDocument()
        expect(screen.getByText('Oops! The page you are looking for does not exist.')).not.toBeNull();
    });
});
