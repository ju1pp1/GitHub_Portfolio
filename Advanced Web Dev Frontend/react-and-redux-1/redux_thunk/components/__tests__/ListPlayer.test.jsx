import { render, screen, fireEvent } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { afterEach, beforeEach, describe, expect, it, test, vi } from "vitest";
import { ListPlayer } from "../ListPlayer.jsx";
import thunk from "redux-thunk";
import { getSelectedPlayer } from "../../redux/actionCreators/thunks/ListPlayer.js";

describe("ListPlayer", () => {
  let player;
  let component;
  let mockStore;
  let clickHandler;
  let emptyStore;

  beforeEach(() => {
    player = { id: 1, name: "Test Player" };
    const middlewares = [thunk];
    mockStore = configureMockStore(middlewares);
    emptyStore = mockStore({});
    emptyStore.dispatch = vi.fn();

    // Render the component
    component = render(
      <Provider store={emptyStore}>
        <ListPlayer {...player} />
      </Provider>
    );
  });

  // after each, reset the stub and unmount the component
  afterEach(() => {
    component.unmount();
  });

  test("renders a list item with the player's id as its id", () => {
    expect(screen.getByRole("listitem").id).toBe("player-" + player.id);
  });

  test("displays the player name inside the anchor element", () => {
    expect(screen.getByRole("link").textContent).toBe(player.name);
  });

  test("calls the onClick prop with the player id when the link is clicked", () => {
    fireEvent.click(screen.getByRole("link"));
    expect(emptyStore.dispatch).toHaveBeenCalledTimes(1);
    expect(emptyStore.dispatch.mock.calls[0][0].toString()).toBe(
      getSelectedPlayer(1).toString()
    );
  });
});
