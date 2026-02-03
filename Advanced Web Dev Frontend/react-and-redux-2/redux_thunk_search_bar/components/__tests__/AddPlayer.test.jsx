/** @format */

import configureMockStore from "redux-mock-store";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { AddPlayer } from "../AddPlayer";
import { postPlayer } from "../../redux/actionCreators/thunks/AddPlayer";
let store;
import { afterEach, beforeEach, describe, expect, it, test, vi } from "vitest";

/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
describe("AddPlayer", () => {
  let component;
  beforeEach(() => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    store = mockStore({});
  });

  afterEach(() => {
    store.clearActions();
    component.unmount();
  });

  test("postPlayer is dispatched when form is submitted with played info", async () => {
    store.dispatch = vi.fn();
    component = render(
      <Provider store={store}>
        <AddPlayer />
      </Provider>
    );
    const { container } = component;
    const form = container.querySelector("form");
    fireEvent.submit(form);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(1));
    expect(store.dispatch.mock.calls[0][0].toString()).toBe(
      postPlayer().toString()
    );
  });

  test("clears the input when the form is submitted", async () => {
    component = render(
      <Provider store={store}>
        <AddPlayer />
      </Provider>
    );

    const { container } = component;
    const form = container.querySelector("form");
    const input = container.querySelector("#input-player");
    fireEvent.change(input, { target: { value: "New Player" } });
    expect(input.value).toBe("New Player");
    fireEvent.submit(form);
    await waitFor(() => expect(input.value.trim()).toBe(""));
  });
});
