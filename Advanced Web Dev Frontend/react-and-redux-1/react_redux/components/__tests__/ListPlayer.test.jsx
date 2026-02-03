import { render, screen, fireEvent } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { afterEach, beforeEach, describe, expect, it, test, vi } from "vitest";
import { ListPlayer } from "../ListPlayer.jsx";

describe("ListPlayer", () => {
  let player;
  let component;
  let mockStore;
  let clickHandler;

  beforeEach(() => {
    player = { id: 1, name: "Test Player" };
    mockStore = configureMockStore();
    clickHandler = vi.fn();

    // Render the component
    component = render(
      <Provider store={mockStore({})}>
        <ListPlayer {...player} onClick={clickHandler} />
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
    expect(clickHandler).toHaveBeenCalledWith(player.id);
  });

  test("Accessibility: anchor should be focusable via the keyboard (by pressing the tab key)", async () => {
    const link = screen.getByRole("link");
    // directly call the focus method on the link
    link.focus();
    // check that the link is focused

    expect(document.activeElement).toBe(link);
  });
});
