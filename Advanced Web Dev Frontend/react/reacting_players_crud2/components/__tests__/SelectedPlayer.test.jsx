/** @format */

import { render, fireEvent, screen } from "@testing-library/react";
import { describe, test, beforeEach, afterEach, expect } from "vitest";
import sinon from "sinon";
import { SelectedPlayer } from "../SelectedPlayer";

describe("SelectedPlayer", () => {
  let player;
  let component;
  let handleDelete;
  let handleUpdate;

  beforeEach(async () => {
    handleDelete = sinon.spy();
    handleUpdate = sinon.spy();

    player = { id: 1, name: "Test Player", isActive: true };
    component = render(
      <SelectedPlayer
        player={player}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    );
  });

  afterEach(() => {
    component.unmount();
  });

  test("displays the selected player information when a player is passed as a prop with correct ui", async () => {
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
    const checkbox = elem.querySelector("#checkbox");
    expect(checkbox).toBeTruthy();
    expect(checkbox.checked === player.isActive).toBeTruthy();
    // expect the delete button to be present
    const deleteButton = elem.querySelector(".btn-delete");
    expect(deleteButton).toBeTruthy();
    // expect the update button to be present
    const updateButton = elem.querySelector(".btn-update");
    expect(updateButton).toBeTruthy();
    // expect update button to be disabled
    expect(updateButton.disabled).toBeTruthy();
  });

  test("should not render if selected player is null", async () => {
    component.unmount();
    component = render(<SelectedPlayer player={null} />);
    const { container } = component;
    const elem = container.querySelector("#selected-player");
    expect(!elem).toBeTruthy();
  });

  test("calls the handleDelete function with the player id when the delete button is clicked", async () => {
    const { container } = component;
    const deleteButton = container.querySelector(".btn-delete");
    fireEvent.click(deleteButton);
    expect(handleDelete.calledWith(1)).toBeTruthy();
  });

  test("calls the handleUpdate function with the updated player active state when the update button is clicked", async () => {
    const { container } = component;
    const checkbox = container.querySelector("#checkbox");
    fireEvent.click(checkbox);

    const changedPlayerState = !player.isActive;

    const updateButton = container.querySelector(".btn-update");
    fireEvent.click(updateButton);
    expect(handleUpdate.calledWith(changedPlayerState)).toBeTruthy();
  });

  test("should not call handleUpdate if checkbox is clicked twice (aka player state is not changed)", async () => {
    const { container } = component;

    const html = container.innerHTML;

    fireEvent.click(await screen.findByRole("checkbox"));
    fireEvent.click(await screen.findByRole("checkbox"));

    const updateButton = container.querySelector(".btn-update");

    fireEvent.click(updateButton);
    expect(!handleUpdate.calledOnce).toBeTruthy();
  });
});
