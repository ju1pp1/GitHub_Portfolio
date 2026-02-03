import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import VIPArea from '../VIPArea';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('VIPArea Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: null,
    });
    store.dispatch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it('redirects to login if user is not logged in', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <VIPArea />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.queryByText(/VIP Area/i)).toBeNull();
  });

  it('renders VIP area if user is logged in', () => {
    store = mockStore({
      user: { name: 'VIP User' },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <VIPArea />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/VIP Area/i)).not.toBeNull();
    expect(screen.getByText(/Registered and logged-in\? Then welcome!/i)).not.toBeNull();
  });
});