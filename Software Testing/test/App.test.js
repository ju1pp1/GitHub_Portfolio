import 'jsdom-global/register.js';
import { expect } from 'chai';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../src/App.js'; // Adjust the path as needed, now .js and not .jsx
import { within } from '@testing-library/react'

global.localStorage = {
  getItem: (key) => {
    return global.localStorage[key] || null;
  },
  setItem: (key, value) => {
    global.localStorage[key] = value.toString();
  },
  removeItem: (key) => {
    delete global.localStorage[key];
  },
  clear: () => {
    Object.keys(global.localStorage).forEach(key => {
      if (key !== 'getItem' && key !== 'setItem' && key !== 'removeItem' && key !== 'clear') {
        delete global.localStorage[key];
      }
    });
  }
};

// clear localStorage before each test
describe('App Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the main header', () => {
    render(React.createElement(App));
    const headerElement = screen.getByText(/E-commerce store/i);
    expect(headerElement).to.exist;
  });

  it('allows creating a new user', () => {
    render(React.createElement(App));

    // Filling user creation form
    fireEvent.change(screen.getByPlaceholderText('first name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('last name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('email'), { target: { value: 'john.doe@gmail.com' } });
    fireEvent.click(screen.getByText('Subscribe to newsletter'));
    fireEvent.click(screen.getByText('Create User'));

    // Expect an alert or other output (modify based on actual app behavior)
    const createdUserAlert = screen.getByText(/User created: John Doe/i);
    expect(createdUserAlert).to.exist;
  });

  it('adds product to cart', () => {
    render(React.createElement(App));

    const addToCartButton = screen.getAllByText('Add to cart')[0];
    // Simulate clicking on "Add to cart" for a product
    fireEvent.click(addToCartButton);

    const cartHeading = screen.getByText(/Shopping Cart/i);
    const cartSection = cartHeading.parentElement;

    // Verify the product appears in the cart
    const cartItem = within(cartSection).getByText((content, element) => {
      return content.includes('Apple') && content.includes('$1.20');
    });
    expect(cartItem).to.exist;
  });

  it('calculates total cart price', () => {
    render(React.createElement(App));

    const addCartButtons = screen.getAllByText('Add to cart');
    // Simulate adding multiple products to the cart
    fireEvent.click(addCartButtons[0]);

    // Verify that total cart price is updated
    const totalPrice = screen.getByText(/Total:/i);
    expect(totalPrice.textContent).to.contain('$1.20');
  });
});

describe('E-commerce store integration test', () => {
  beforeEach(() => {
    localStorage.clear();
    render(React.createElement(App));
  });

  it('should allow user creation, add items to cart, and maintain cart items after page reloading.', () => {
    fireEvent.change(screen.getByPlaceholderText('first name'), {target: {value: 'John'} });
    fireEvent.change(screen.getByPlaceholderText('last name'), {target: {value: 'Doe'} });
    fireEvent.change(screen.getByPlaceholderText('email'), {target: {value: 'john.doe@gmail.com'} });
    fireEvent.click(screen.getByText('Subscribe to newsletter'));
    fireEvent.click(screen.getByText('Create User'));

    const createdUserAlert = screen.getByText(/User created: John Doe/i);
    expect(createdUserAlert).to.exist;

    const addCartButtons = screen.getAllByText('Add to cart');
    fireEvent.click(addCartButtons[0]); // add apple
    fireEvent.click(addCartButtons[1]); // add banana

    const cartHeading = screen.getByText(/Shopping Cart/i);
    const cartSection = cartHeading.parentElement;

    expect(within(cartSection).getByText((content, element) => {
      return content.includes('Apple') && content.includes('$1.20');
    })).to.exist;
    expect(within(cartSection).getByText((content, element) => {
      return content.includes('Banana') && content.includes('$0.50');
    })).to.exist;

    const totalPrice = screen.getByText(/Total:/i);
    expect(totalPrice.textContent).to.contain('$1.70');

    //page reload
    render(React.createElement(App));

    const savedCart = JSON.parse(localStorage.getItem('cart'));
    expect(savedCart.length).to.equal(2);
    expect(savedCart[0].name).to.equal('Apple');
    expect(savedCart[1].name).to.equal('Banana');
  });
});