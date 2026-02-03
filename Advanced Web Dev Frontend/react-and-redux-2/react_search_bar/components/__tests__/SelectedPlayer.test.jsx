/** @format */

import { render } from "@testing-library/react";
import { describe, test, afterEach, expect } from "vitest";
import { SelectedPlayer } from "../SelectedPlayer";

describe("SelectedPlayer component", () => {
  let component;
  const player = { id: 1, name: "player 1", isActive: true };
  const inactivePlayer = { id: 2, name: "player 2", isActive: false };

  afterEach(() => {
    component.unmount();
  });

  test("should render active player data correctly", () => {
    component = render(<SelectedPlayer player={player} />);

    const { container } = component;
    const elem = container.querySelector("#selected-player");
    expect(elem).toBeTruthy();
    expect(
      elem.querySelector("#player-name").textContent.trim() === player.name
    ).toBeTruthy();
    const playerStatus = elem
      .querySelector("#player-status")
      .textContent.trim()
      .toLowerCase();
    expect(playerStatus === "active").toBeTruthy();
  });

  test("should render inactive player data correctly", async () => {
    component = render(<SelectedPlayer player={inactivePlayer} />);
    const { container } = component;
    const elem = container.querySelector("#selected-player");
    expect(elem).toBeTruthy();
    expect(
      elem.querySelector("#player-name").textContent.trim() ===
        inactivePlayer.name
    ).toBeTruthy();
    const playerStatus = elem
      .querySelector("#player-status")
      .textContent.trim()
      .toLowerCase();
    expect(playerStatus === "inactive").toBeTruthy();
  });

  test("should not render if selected player is null", async () => {
    component = render(<SelectedPlayer player={null} />);
    const { container } = component;
    const elem = container.querySelector("#selected-player");
    expect(!elem).toBeTruthy();
  });
});
