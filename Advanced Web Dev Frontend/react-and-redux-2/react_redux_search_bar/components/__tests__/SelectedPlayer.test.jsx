/** @format */
import { render, screen } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { afterEach, beforeEach, describe, expect, test } from "vitest";

import { SelectedPlayer } from "../SelectedPlayer";

describe("SelectedPlayer component", () => {
  let component;
  const player = { id: 1, name: "player 1", isActive: true };
  const inactivePlayer = { id: 2, name: "player 2", isActive: false };

  let mockStore;

  afterEach(() => {
    component.unmount();
  });

  beforeEach(() => {
    mockStore = configureMockStore();
  });

  test("should render active player data correctly", () => {
    const store = mockStore({
      selectedPlayer: player,
    });

    component = render(
      <Provider store={store}>
        <SelectedPlayer />
      </Provider>
    );

    const { container } = component;
    const elem = container.querySelector("#selected-player");
    expect(elem).not.toBeNull();
    expect(elem.querySelector("#player-name").textContent.trim()).toBe(
      player.name
    );
    const playerStatus = elem
      .querySelector("#player-status")
      .textContent.trim()
      .toLowerCase();
    expect(playerStatus).toBe("active");
  });

  test("should render inactive player data correctly", async () => {
    const store = mockStore({
      selectedPlayer: inactivePlayer,
    });

    component = render(
      <Provider store={store}>
        <SelectedPlayer />
      </Provider>
    );

    const { container } = component;
    const elem = container.querySelector("#selected-player");
    expect(elem).not.toBeNull();
    expect(elem.querySelector("#player-name").textContent.trim()).toBe(
      inactivePlayer.name
    );
    const playerStatus = elem
      .querySelector("#player-status")
      .textContent.trim()
      .toLowerCase();
    expect(playerStatus).toBe("inactive");
  });

  test("should not render if selected player is null", async () => {
    const store = mockStore({
      selectedPlayer: null,
    });

    component = render(
      <Provider store={store}>
        <SelectedPlayer />
      </Provider>
    );

    const { container } = component;
    const elem = container.querySelector("#selected-player");
    expect(elem).toBeNull();
  });
});
