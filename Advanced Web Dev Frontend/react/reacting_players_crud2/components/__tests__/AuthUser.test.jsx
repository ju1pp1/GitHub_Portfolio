/** @format */
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, test, beforeEach, afterEach, expect } from "vitest";
import sinon from "sinon";
import userEvent from "@testing-library/user-event";

import { AuthUser } from "../AuthUser";

/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */

describe("AuthUser component", () => {
  let container;
  let wrapper;

  afterEach(() => {
    wrapper.unmount();
    container = null;
  });

  test('Link text is "Logout", when isLoggedIn is true', () => {
    const isLoggedIn = true;

    wrapper = render(<AuthUser isLoggedIn={isLoggedIn} />);
    container = wrapper.container;
    const link = container.querySelector("a");
    expect(link).toBeTruthy();
    expect(link.textContent.trim().includes("Logout")).toBeTruthy();
  });

  test(' "Go to register" by default in link, "login" by default in button', () => {
    wrapper = render(<AuthUser />);
    container = wrapper.container;
    const link = container.querySelector("a");
    expect(link).toBeTruthy();
    expect(
      link.textContent.trim().toLowerCase().includes("register")
    ).toBeTruthy();
    const button = container.querySelector("button");
    expect(button).toBeTruthy();
    expect(
      button.textContent.trim().toLowerCase().includes("login")
    ).toBeTruthy();
  });

  test('Text is "Go to login" when isLoggedIn is false and Link is clicked once, "register" in button', async () => {
    const isLoggedIn = false;
    wrapper = render(<AuthUser isLoggedIn={isLoggedIn} />);
    container = wrapper.container;
    const link = container.querySelector("a");
    expect(link).toBeTruthy();
    expect(
      link.textContent.trim().toLowerCase().includes("register")
    ).toBeTruthy();
    userEvent.click(link);
    await screen.findByRole("link", { name: /login/i });
    expect(
      link.textContent.trim().toLowerCase().includes("login")
    ).toBeTruthy();
    const button = container.querySelector("button");
    expect(button).toBeTruthy();
    expect(
      button.textContent.trim().toLowerCase().includes("register")
    ).toBeTruthy();
  });
});

describe("Logout: Called functions", () => {
  let container;
  let wrapper;

  afterEach(() => {
    wrapper.unmount();
    container = null;
  });

  test("handleLogout is called when isLoggedIn is true and the logout link is clicked", () => {
    const handleLogout = sinon.spy();
    const isLoggedIn = true;
    wrapper = render(
      <AuthUser isLoggedIn={isLoggedIn} onLogout={handleLogout} />
    );
    container = wrapper.container;
    const link = container.querySelector("a");
    expect(link).toBeTruthy();
    expect(
      link.textContent.trim().toLowerCase().includes("logout")
    ).toBeTruthy();
    fireEvent.click(link);
    expect(handleLogout.calledOnce).toBeTruthy();
  });
});

describe("submit", () => {
  let container;
  let wrapper;

  afterEach(() => {
    wrapper.unmount();
    container = null;
  });

  test("onLogin is called with username and password when isLogin is true", () => {
    const onLogin = sinon.spy();
    wrapper = render(<AuthUser isLoggedIn={false} onLogin={onLogin} />);
    container = wrapper.container;

    const username = container.querySelector("#username");
    expect(username).toBeTruthy();
    const password = container.querySelector("#password");
    expect(password).toBeTruthy();
    fireEvent.change(username, { target: { value: "username" } });
    fireEvent.change(password, { target: { value: "password" } });
    const form = container.querySelector("form");
    expect(form).toBeTruthy();
    fireEvent.submit(form);
    expect(onLogin.calledOnce).toBe(true);
    expect(onLogin.calledWith("username", "password")).toBe(true);
  });

  test("onRegister is called with username and password when isLogin is false", async () => {
    const onRegister = sinon.spy();
    const onLogin = sinon.spy();
    wrapper = render(
      <AuthUser isLoggedIn={false} onLogin={onLogin} onRegister={onRegister} />
    );
    container = wrapper.container;
    const link = container.querySelector("a");
    expect(link, "link not found").toBeTruthy();
    expect(
      link.textContent.trim().toLowerCase().includes("register"),
      "link text not found"
    ).toBe(true);
    userEvent.click(link);
    await screen.findByRole("link", { name: /login/i });
    expect(
      link.textContent.trim().toLowerCase().includes("login")
    ).toBeTruthy();
    const username = container.querySelector("#username");
    expect(username, "username not found").toBeTruthy();
    const password = container.querySelector("#password");
    expect(password, "password not found").toBeTruthy();
    fireEvent.change(username, { target: { value: "username" } });
    fireEvent.change(password, { target: { value: "password" } });
    const form = container.querySelector("form");
    expect(form, "form not found").toBeTruthy();
    fireEvent.submit(form);
    expect(onLogin.calledOnce, "onLogin should not be called, but it is").toBe(
      false
    );
    expect(
      onRegister.calledOnce,
      "onRegister should be called, but it is not"
    ).toBe(true);
    expect(onRegister.calledWith("username", "password")).toBe(true);
  });
});
