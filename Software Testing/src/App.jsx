/* cd:llä kansioon (part1) ja npm run dev -> avaa localhost selaimessa. */
import React, {useState} from 'react';
import capitalize from 'software-testing-assignment/src/capitalize'; 
import add from 'software-testing-assignment/src/add';
import get from 'software-testing-assignment/src/get'; 
import filter from 'software-testing-assignment/src/filter'; 
import reduce from 'software-testing-assignment/src/reduce'; 
import map from 'software-testing-assignment/src/map'; 
import defaultTo from 'software-testing-assignment/src/defaultTo'; 
import isEmpty from 'software-testing-assignment/src/isEmpty';
import isBoolean from 'software-testing-assignment/src/isBoolean'; 
import endsWith from 'software-testing-assignment/src/endsWith'; 

//Komponentti Hello
/* const Hello = (props) => {
  console.log(props)
  return (
  <div>
    <p>
      Hello {props.name}, you are {props.age} years old
    </p>
  </div>
)
} */

//Check library for capitalize.js, add.js, get.js, filter.js, reduce.js, map.js, defaultTo.js, isEmpty.js, isBoolean.js, endsWith.js
/*const App = () => {
  const nimi = 'Pekka'
  const ika = 10
  // Example for capitalize.js
  const input = "hello world"
  const output = capitalize(input)

  // Example for add.js
  const num1 = 5.01;
  const num2 = 15.99;
  const sum = add(num1, num2);

  // Example for get.js
  const product = {
    info: {
      type: 'Fruit',
      details: {
        name: 'Apple',
        price: 0.25
      }
    }
  }; */

  const App = () => {
    //User creation state
    const [user, setUser] = useState({
      firstName: "",
      lastName: "",
      email: "",
      sendNewsLetter: false,
    });

    const [product, setProduct] = useState({
      name: "",
      type: "",
      price: 0,
      productContents: "",
      producer: "",
    });

    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([
      { name: "Apple", type: "Fruit", price: 1.2, productContents: "", producer: "Farmers Group"},
      { name: "Banana", type: "Fruit", price: 0.5, productContents: "", producer: "Chiquita"},
      { name: "Carrot", type: "Vegetable", price: 0.8, productContents: "", producer: "Viljanen Oy"},
      { name: "Almond", type: "Nut", price: 1.5, productContents: "", producer: "Leslie's"},
      { name: "Onion", type: "Vegetable", price: 0.75, productContents: "", producer: "Viljanen Oy"},
    ]);
  
    const [filterType, setFilterType] = useState('');
    const displayedProducts = filterType
    ? filter(products, (product) => product.type.toLowerCase() === filterType.toLowerCase()) : products;

    const addToCart = (product) => {
      setCart([...cart, product]);
      alert(`${product.name} added to cart!`);
    }
  const handleUserCreation = () => {
    const { firstName, lastName, email, sendNewsLetter } = user;
    const finalFirstName = capitalize(defaultTo(firstName, 'John'));
    const finalLastName = capitalize(defaultTo(lastName, 'Doe'));

    let valid = true;
    if(isEmpty(firstName)) {
      alert("First name is required. Default value 'John' will be used.");
      valid = false;
    }
    if(isEmpty(lastName)) {
      alert("Last name is required. Default value 'Doe' will be used.");
      valid = false;
    }
    if(isEmpty(email)) {
      alert("Email is required.")
    } else if(!email.includes('@') || !endsWith(email, '.com')) {
      alert("Email should contain '@' and end with '.com'.");
      valid = false;
    }
    if(!isBoolean(sendNewsLetter)) {
      alert("Send newsletter should be a boolean value.");
      valid = false;
    }
    if(valid) {
      setUser({...user, firstName: finalFirstName, lastName: finalLastName});
      alert(`User created: ${finalFirstName} ${finalLastName}`)
    }
  };

  const handleProductAddition = () => {
    const {name, type, price, productContents: productContents, producer} = product;
    if(isEmpty(name) || isEmpty(type) ) {
      alert("Product name, type and price are required.");
      return;
    }

    //setCart([...cart, product]);
    setProducts([...products, {name, type, price, productContents: productContents, producer}]);
    setProduct({name: '', type: '', price: 0, productContents: '', producer: ''});
    alert(`Product added: ${name}`);
  };

  const totalCartPrice = reduce(cart, (acc, product) => add(acc, product.price), 0);
  const searchProducts = (type) => {
    const filteredProducts = filter(products, (product) => product.type === type);
    return map(filteredProducts, (product) => capitalize(product.name));
  };

  return (
    <div>
      <h1>E-commerce store</h1>

      <section>
        <h2>Create user</h2>
        <input type="text"
        placeholder='first name'
        value={user.firstName}
        onChange={(e) => setUser({...user, firstName: e.target.value })}
         />
         <input type="text"
        placeholder='last name'
        value={user.lastName}
        onChange={(e) => setUser({...user, lastName: e.target.value })}
         />
         <input type="text"
        placeholder='email'
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value })}
         />
         <label>
          <div>
         <input type="checkbox"
        checked={user.sendNewsLetter}
        onChange={(e) => setUser({...user, sendNewsLetter: e.target.checked })}
         />
         Subscribe to newsletter
         </div>
         </label>
         <button onClick={handleUserCreation}>Create user</button>
      </section>

      <section>
        <h2>Add product</h2>
        <input 
        type="text"
        placeholder='product name'
        value={product.name}
        onChange={(e) => setProduct({...product, name: e.target.value})}
        />
        
        <div>
        <br></br>
          <label>Product Type:</label>
          <div>
            <label>
              <input 
              type="radio"
              name="type"
              value="Vegetable"
              checked={product.type === "Vegetable"}
              onChange={(e) => setProduct({ ...product, type: e.target.value })}
              />
              Vegetable
            </label>
            <label>
              <input 
              type="radio"
              name="type"
              value="Fruit"
              checked={product.type === "Fruit"}
              onChange={(e) => setProduct({ ...product, type: e.target.value })}
              />
              Fruit
            </label>
            <label>
              <input 
              type="radio"
              name="type"
              value="Nut"
              checked={product.type === "Nut"}
              onChange={(e) => setProduct({ ...product, type: e.target.value })}
              />
              Nut
            </label>
            <label>
              <input 
              type="radio"
              name="type"
              value="Grain"
              checked={product.type === "Grain"}
              onChange={(e) => setProduct({ ...product, type: e.target.value })}
              />
              Grain
            </label>
          </div>
          <br></br>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h3 style={{ margin: 0 }}>Price</h3>
        
        <input 
        type="number"
        placeholder='product price'
        step="0.01"
        value={product.price}
        onChange={(e) => {
          const price = parseFloat(e.target.value.replace(',', '.')).toFixed(2);
          setProduct({...product, price: parseFloat(price) });
        }}
        />
        </div>
        <br></br>
        <div>
        <input 
        type="text"
        placeholder='product contents (optional)'
        value={product.productContents}
        onChange={(e) => setProduct({...product, productContents: e.target.value})}
        />
        </div>
        <br></br>
        <input
        type="text"
        placeholder='producer name'
        value={product.producer}
        onChange={(e) => setProduct({...product, producer: e.target.value})}
        />
        <br></br><br></br>
        <button onClick={handleProductAddition}>Add product</button>
      </section>

        {/* Product filter */}
        <section>
          <h2>Filter products by type</h2>
          <input
          type="text"
          placeholder='Enter product type (e.g., Fruit'
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          />
        </section>
        {/* Display filtered products */}
        <section>
          <h2>Available products</h2>
          <ul>
            {displayedProducts.map((prod, index) => (
              <li key={index}>
               {capitalize(prod.name)} - {capitalize(prod.type)} - ${prod.price !== undefined ? prod.price.toFixed(2) + " ": "0.00"} - {capitalize(prod.producer) + " "}
                <button onClick={() => addToCart(prod)}>Add to cart</button>
              </li>
            ))}
          </ul>
        </section>
      <section>
        <h2>Shopping cart</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {capitalize(get(item, "name"))} - ${get(item, "price").toFixed(2)}
            </li>
          ))}
        </ul>
        <h3>Total: ${totalCartPrice.toFixed(2)}</h3>
      </section>

    </div>
  );
  /*
  const productPrice = get(product, 'info.details.price', 'No price');

  //Example for filter.js
  const products = [
    {name: "Apple", type: "Fruit", price: 1.2},
    {name: "Banana", type: "Fruit", price: 0.5},
    {name: "Cucumber", type: "Vegetable", price: 0.8},
    {name: "Almond", type: "Nut", price: 1.5},
    {name: "Broccoli", type: "Vegetable", price: 1.0},
  ];
  const fruits = filter(products, (product) => product.type === "Fruit");

  // example usage of reduce.js
  const totalFruitPrice = reduce(fruits, (acc, product) => acc + product.price, 0);

  // Example usage of map.js
  const fruitNames = map(fruits, (product) => product.name.toUpperCase());
  
  // Example usage of defaultTo
  const unknownValue = undefined;
  const resolvedValue = defaultTo(unknownValue, 'Default Value');
  // Example usage of isEmpty
  const emptyArray = [];
  const emptyObject = {};
  const nonEmptyArray = [1, 2, 3];
  const nonEmptyObject = {name: "example"};

  const isEmptyArray = isEmpty(emptyArray);
  const isEmptyObject = isEmpty(emptyObject);
  const isNonEmptyArray = isEmpty(nonEmptyArray);
  const isNonEmptyObject = isEmpty(nonEmptyObject);
  
  // Example usage of isBoolean
  const value1 = true;
  const value2 = "hello";
  const value3 = false;
  const value4 = 0;
  
  const isBooleanValue1 = isBoolean(value1);
  const isBooleanValue2 = isBoolean(value2);
  const isBooleanValue3 = isBoolean(value3);
  const isBooleanValue4 = isBoolean(value4);

  // Example usage of endsWith
  const greeting = "Welcome to the webstore!";
  const endsWithStuff = endsWith(greeting, "webstore!");
  const endsWithReact = endsWith(greeting, "React");

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={nimi} age={ika} />
      <h1>{output}</h1>
      <p>Sum of {num1} and {num2} is: {sum}</p>
      <p>Price is: {productPrice}</p>
      <h2>Fruits:</h2>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit.name} - {fruit.price}</li>
        ))}
      </ul>
      <h2>Total price of fruits: ${totalFruitPrice.toFixed(2)}</h2>
      <ul>
        {fruitNames.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
      <h2>{resolvedValue}</h2>
      <h2>isEmpty checks:</h2>
      <p>Is empty array: {isEmptyArray ? "Yes" : "No"} </p>
      <p>Is empty array: {isEmptyObject ? "Yes" : "No"} </p>
      <p>Is empty array: {isNonEmptyArray ? "Yes" : "No"} </p>
      <p>Is empty array: {isNonEmptyObject ? "Yes" : "No"} </p>

      <h2>isBoolean checks:</h2>
      <p>Is value1 (true) boolean? {isBooleanValue1 ? "Yes" : "No"} </p>
      <p>Is value2 ("hello") boolean? {isBooleanValue2 ? "Yes" : "No"} </p>
      <p>Is value3 (false) boolean? {isBooleanValue3 ? "Yes" : "No"} </p>
      <p>Is value4 (0) boolean? {isBooleanValue4 ? "Yes" : "No"} </p>

      <h2>endsWith checks:</h2>
      <p>Does greeting end with "webstore!"? {endsWithStuff ? "Yes" : "No"} </p>
      <p>Does greeting end with "React"? {endsWithReact ? "Yes" : "No"} </p>
    </div>
  )*/
};
export default App
