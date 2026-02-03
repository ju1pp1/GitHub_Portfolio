import { render, screen } from "@testing-library/react";
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
});
