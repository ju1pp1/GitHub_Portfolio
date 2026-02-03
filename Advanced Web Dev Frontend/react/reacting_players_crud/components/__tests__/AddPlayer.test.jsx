/** @format */

import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, test, beforeEach, afterEach, expect } from "vitest";
import sinon from "sinon";
import { AddPlayer } from "../AddPlayer";

describe("AddPlayer", () => {
  let component;
  let submitSpy;
  beforeEach(() => {
    submitSpy = sinon.spy();
    component = render(<AddPlayer handleSubmit={submitSpy} />);
  });

  afterEach(() => {
    sinon.restore();
    component.unmount();
  });

  test("calls the handesubmit function with the input value when the form is submitted", async () => {
    const { container } = component;
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Test Player" } });
    fireEvent.submit(container.querySelector("form"));
    expect(submitSpy.calledOnce).toBeTruthy();
    expect(submitSpy.calledWith("Test Player")).toBeTruthy();
  });

  test("clears the input when the form is submitted", async () => {
    const { container } = component;
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Test Player" } });
    fireEvent.submit(container.querySelector("form"));
    await waitFor(() =>
      expect(input.value === "", "input value should be cleared").toBeTruthy()
    );
  });
});
