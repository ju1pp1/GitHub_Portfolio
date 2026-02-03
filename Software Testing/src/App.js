import React, { useEffect, useState } from 'react';
import capitalize from 'software-testing-assignment/src/capitalize.js';
import add from 'software-testing-assignment/src/add.js';
import get from 'software-testing-assignment/src/get.js';
import filter from 'software-testing-assignment/src/filter.js';
import reduce from 'software-testing-assignment/src/reduce.js';
import map from 'software-testing-assignment/src/map.js';
import defaultTo from 'software-testing-assignment/src/defaultTo.js';
import isEmpty from 'software-testing-assignment/src/isEmpty.js';
import isBoolean from 'software-testing-assignment/src/isBoolean.js';
import endsWith from 'software-testing-assignment/src/endsWith.js';

const App = () => {
  // Replace any JSX elements with React.createElement
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    sendNewsLetter: false,
  });

  const [userCreated, setUserCreated] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [products, setProducts] = useState([
    { name: 'Apple', type: 'Fruit', price: 1.2, producer: "Johnson's", productContents: 'Vitamin C, Fiber' },
    { name: 'Banana', type: 'Fruit', price: 0.5, producer: "Chiquita", productContents: 'Vitamin B' },
    { name: 'Carrot', type: 'Vegetable', price: 0.15, producer: "Viljanen Oy", productContents: 'Vitamin A' },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    type: '',
    price: '',
    producer: '',
    productContents: '',
  });

  // Store cart items if page gets reloaded
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if(savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // User creation
  const handleUserCreation = () => {
    const finalFirstName = capitalize(defaultTo(user.firstName, 'John'));
    const finalLastName = capitalize(defaultTo(user.lastName, 'Doe'));
    const email = get(user, 'email', '');

    if (isEmpty(email) || !email.includes('@') || !endsWith(email, '.com')) {
      alert('Email is required, should contain "@" and should end with ".com"');
      return;
    }
    if(!isBoolean(user.sendNewsLetter)) {
      alert('Newsletter subscription should be a boolean');
      return;
    }
    setUser({ ...user, firstName: finalFirstName, lastName: finalLastName });
    setSuccessMessage(`User created: ${finalFirstName} ${finalLastName}`);
    setUserCreated(true);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const addNewProduct = () => {
    const { name, type, price, producer, productContents } = newProduct;
    if(!name || !type || !price || !producer) {
      alert('All fields are required to add product.');
      return;
    }

    const product = {
      name: capitalize(name),
      type: capitalize(type),
      price: parseFloat(price),
      producer: capitalize(producer),
      productContents,
    };
    setProducts([...products, product]);
    setNewProduct({name: '', type: '', price: '', producer: '', productContents: ''});
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const totalCartPrice = reduce(cart, (acc, product) => add(acc, product.price), 0);

  // Filter products by name, type, contents or producer
  const getFilteredProducts = () => {
    if (!searchQuery) return products;
    const query = searchQuery.toLowerCase();
    return filter(products, (product) =>
      product.name.toLowerCase().includes(query) ||
      product.type.toLowerCase().includes(query) ||
      product.productContents.toLowerCase().includes(query) ||
      product.producer.toLowerCase().includes(query)
    );
  };

  const getCartSummary = () => {
    return map(cart, item => ({
      name: item.name,
      price: item.price,
      producer: item.producer,
    }));
  };
  
  // User interface
  return React.createElement(
    'div',
    null,
    React.createElement('h1', null, 'E-commerce store'),
    successMessage && React.createElement('p', null, successMessage),
    React.createElement(
      'section',
      null,
      React.createElement('input', {
        placeholder: 'first name',
        value: user.firstName,
        onChange: (e) => setUser({ ...user, firstName: e.target.value }),
      }),
      React.createElement('input', {
        placeholder: 'last name',
        value: user.lastName,
        onChange: (e) => setUser({ ...user, lastName: e.target.value }),
      }),
      React.createElement('input', {
        placeholder: 'email',
        value: user.email,
        onChange: (e) => setUser({ ...user, email: e.target.value }),
      }),
      React.createElement('input', {
        type: 'checkbox',
        checked: user.sendNewsLetter,
        onChange: (e) => setUser({ ...user, sendNewsLetter: e.target.checked}),
      }),
      'Subscribe to newsletter',
      React.createElement(
        'button',
        { onClick: handleUserCreation },
        'Create User'
      )
    ),
    userCreated &&
    React.createElement(
      'section',
      null,
    React.createElement('h2', null, 'Add new product'),
    React.createElement('input', {
      placeholder: 'Product name',
      value: newProduct.name,
      onChange: (e) => setNewProduct({ ...newProduct, name: e.target.value }),
    }),
    React.createElement('input', {
      placeholder: 'Product type',
      value: newProduct.type,
      onChange: (e) => setNewProduct({ ...newProduct, type: e.target.value }),
    }),
    React.createElement('input', {
      placeholder: 'Price',
      type: 'number',
      value: newProduct.price,
      onChange: (e) => setNewProduct({ ...newProduct, price: e.target.value }),
    }),
    React.createElement('input', {
      placeholder: 'Producer',
      value: newProduct.producer,
      onChange: (e) => setNewProduct({ ...newProduct, producer: e.target.value }),
    }),
    React.createElement('input', {
      placeholder: 'Product contents',
      value: newProduct.productContents,
      onChange: (e) => setNewProduct({ ...newProduct, productContents: e.target.value }),
    }),
    React.createElement('button', { onClick: addNewProduct }, 'Add product')),
    React.createElement(
      'section',
      null,
      React.createElement('h2', null, 'Available Products'),
      React.createElement('input', {
        placeholder: 'Search by name, type, contents or producer',
        value: searchQuery,
        onChange: (e) => setSearchQuery(e.target.value),
      }),
      getFilteredProducts().map((product, index) =>
        React.createElement(
          'div',
          { key: index },
          `${product.name} - $${(product.price || 0).toFixed(2)} - ${product.producer} (${product.productContents})`,
          React.createElement(
            'button',
            { onClick: () => addToCart(product) },
            'Add to cart'
          )
        )
      )
    ),
    // shopping cart
    React.createElement('section', null,
      React.createElement('h2', null, 'Shopping Cart'),
      getCartSummary().map((item, index) => 
        React.createElement(
          'div',
            { key: index },
            `${item.name}: $${item.price.toFixed(2)} - ${item.producer}`,
            React.createElement(
              'button',
              { onClick: () => removeFromCart(index) },
              'Remove'
            )
          )
      )
    ),
    React.createElement('h3', null, `Total: $${totalCartPrice.toFixed(2)}`)
  );
};

export default App;