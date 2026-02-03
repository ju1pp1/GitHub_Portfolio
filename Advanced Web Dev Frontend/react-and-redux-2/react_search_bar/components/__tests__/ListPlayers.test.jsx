import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, beforeEach, afterEach, expect } from "vitest";
import sinon from "sinon";
import { ListPlayers } from "../ListPlayers";

describe("ListPlayers", () => {
  const players = [
    { id: 1, name: "Test Player 1" },
    { id: 2, name: "Test Player 2" },
    { id: 3, name: "Test Player 3" },
  ];

  let component;
  const selectPlayer = sinon.stub();

  beforeEach(() => {
    // Render the component
    component = render(
      <ListPlayers players={players} getPlayer={selectPlayer} />
    );
  });

  afterEach(() => {
    selectPlayer.reset();
    component.unmount();
  });

  test('renders a list with id "players-list"', () => {
    expect(screen.getByRole("list", { id: "players-list" })).toBeTruthy();
  });

  test("renders a ListPlayer for each player in the players prop", () => {
    const listPlayers = screen.getAllByRole("listitem");
    expect(listPlayers.length === players.length).toBeTruthy();
  });

  test("renders a search bar", () => {
    // Verify the search bar is rendered
    const searchBar = screen.getByPlaceholderText("Search players...");
    expect(searchBar).toBeTruthy();
  });

  test("filters players based on search input", () => {
    // Type a search term
    const searchBar = screen.getByPlaceholderText("Search players...");
    fireEvent.change(searchBar, { target: { value: "Test Player 1" } });

    // Verify that only the matching player is displayed
    const listPlayers = screen.getAllByRole("listitem");
    expect(listPlayers.length).toBe(1);
    expect(listPlayers[0].textContent).toBe("Test Player 1");
  });

  test("filters players case-insensitively", () => {
    // Type a lowercase search term
    const searchBar = screen.getByPlaceholderText("Search players...");
    fireEvent.change(searchBar, { target: { value: "test player 1" } });

    // Verify that the search is case-insensitive
    const listPlayers = screen.getAllByRole("listitem");
    expect(listPlayers.length).toBe(1);
    expect(listPlayers[0].textContent).toBe("Test Player 1");
  });

  test("resets the list when the search bar is cleared", () => {
    // Type a search term
    const searchBar = screen.getByPlaceholderText("Search players...");
    fireEvent.change(searchBar, { target: { value: "Test Player 1" } });

    // Clear the search bar
    fireEvent.change(searchBar, { target: { value: "" } });

    // Verify that the full list is displayed again
    const listPlayers = screen.getAllByRole("listitem");
    expect(listPlayers.length).toBe(players.length);
  });

  test("shows no players if the search term does not match", () => {
    // Type a non-matching search term
    const searchBar = screen.getByPlaceholderText("Search players...");
    fireEvent.change(searchBar, { target: { value: "NonExistentPlayer" } });

    // Verify that no players are displayed
    const listPlayers = screen.queryAllByRole("listitem");
    expect(listPlayers.length).toBe(0);
  });
});
