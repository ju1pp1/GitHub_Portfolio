/** @format */
import { render } from "@testing-library/react";
import { describe, test, beforeEach, afterEach, expect } from "vitest";
import sinon from "sinon";
import { RequestStatus } from "../RequestStatus";
const randomWord = () => Math.random().toString(36).substring(7);

describe("RequestStatus component", () => {
  const reqStatus = randomWord();
  let component;

  beforeEach(() => {
    component = render(<RequestStatus>{reqStatus} </RequestStatus>);
  });

  afterEach(() => {
    component.unmount();
  });

  test("should render the component, inside which is an element with id 'request-status'", () => {
    const { container } = component;
    const elem = container.querySelector("#request-status");
    expect(elem).toBeTruthy();
  });

  test("should render the component with the correct status", () => {
    const { container } = component;
    const elem = container.querySelector("#request-status");
    expect(elem.textContent.trim() === reqStatus).toBeTruthy();
  });
});
