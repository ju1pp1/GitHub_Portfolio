import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, test, expect, vi,afterEach } from "vitest";
import { SearchBox } from "../SearchBox";

describe("SearchBox Component", () => {
    const randomWord = () => Math.random().toString(36).substring(7);

    afterEach(() => {
        // Ensure the DOM is cleared after each test
        cleanup();
    });

    test("renders the input element", () => {
        // Render the component
        render(<SearchBox searchTerm="" onSearchChange={() => { }} />);

        // Get the input element
        const inputElement = screen.getByPlaceholderText("Search players...");

        // Check if the input element is not null (exists in the DOM)
        expect(inputElement).not.toBeNull();
    });

    test("displays the initial search term", () => {
        const initialSearchTerm = randomWord();

        // Render the component with an initial search term
        render(<SearchBox searchTerm={initialSearchTerm} onSearchChange={() => { }} />);

        // Get the input element
        const inputElement = screen.getByPlaceholderText("Search players...");

        // Check if the value of the input matches the initial search term
        expect(inputElement.value).toBe(initialSearchTerm);
    });

    test("calls onSearchChange when the input value changes", () => {
        const firstSearchTerm = randomWord();
        const mockOnSearchChange = vi.fn();

        // Render the component with the mock function
        render(<SearchBox searchTerm="" onSearchChange={mockOnSearchChange} />);

        // Simulate a user typing in the input field
        const inputElement = screen.getByPlaceholderText("Search players...");
        fireEvent.change(inputElement, { target: { value: firstSearchTerm } });

        // Check if the mock function was called with the correct value
        expect(mockOnSearchChange).toHaveBeenCalledTimes(1);
        expect(mockOnSearchChange).toHaveBeenCalledWith(firstSearchTerm);
    });

    test("updates the input value when searchTerm changes", () => {
        const firstSearchTerm = randomWord();
        const secondSearchTerm = randomWord();

        const { rerender } = render(
            <SearchBox searchTerm={firstSearchTerm} onSearchChange={() => { }} />
        );

        // Get the input element
        const inputElement = screen.getByPlaceholderText("Search players...");

        // Check the initial value
        expect(inputElement.value).toBe(firstSearchTerm);

        // Rerender the component with a new search term
        rerender(<SearchBox searchTerm={secondSearchTerm} onSearchChange={() => { }} />);

        // Check if the input value updates
        expect(inputElement.value).toBe(secondSearchTerm);
    });
});
