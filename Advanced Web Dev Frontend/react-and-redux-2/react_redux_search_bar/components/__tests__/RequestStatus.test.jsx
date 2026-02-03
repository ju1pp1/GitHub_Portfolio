import { render, screen } from "@testing-library/react";

import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { afterEach, beforeEach, describe, expect, it, test } from "vitest";

import { RequestStatus } from "../RequestStatus";

const randomWord = () => Math.random().toString(36).substring(7);

describe("RequestStatus component", () => {
  const reqStatus = randomWord();
  let component;
  let mockStore;

  beforeEach(() => {
    mockStore = configureMockStore();
    const store = mockStore({
      status: reqStatus,
    });
    component = render(
      <Provider store={store}>
        <RequestStatus />
      </Provider>
    );
  });

  afterEach(() => {
    component.unmount();
  });

  test("should render the component, inside which is an element with id 'request-status'", () => {
    const { container } = component;
    const elem = container.querySelector("#request-status");
    expect(elem).not.toBeNull();
  });

  test("should render the component with the correct status", () => {
    const { container } = component;
    const elem = container.querySelector("#request-status");
    expect(elem.textContent).toBe(reqStatus);
  });
});
