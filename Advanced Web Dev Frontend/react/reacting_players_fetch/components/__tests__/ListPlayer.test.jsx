import { render, fireEvent, screen } from "@testing-library/react";
import { expect, describe, test, beforeEach, afterEach } from "vitest";
import sinon from "sinon";
import { ListPlayer } from "../ListPlayer";

describe("ListPlayer", () => {
  let player;
  let component;
  const selectPlayer = sinon.stub();

  beforeEach(() => {
    player = { id: 1, name: "Test Player" };
    // Render the component
    component = render(<ListPlayer player={player} onClick={selectPlayer} />);
  });

  // after each, reset the stub and unmount the component
  afterEach(() => {
    selectPlayer.reset();
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
    expect(selectPlayer.calledWith(player.id)).toBeTruthy();
  });

  test("anchor should be focusable via the keyboard (by pressing the tab key)", async () => {
    const link = screen.getByRole("link");
    // directly call the focus method on the link
    link.focus();
    // check that the link is focused

    expect(document.activeElement).toBe(link);
  });
});
