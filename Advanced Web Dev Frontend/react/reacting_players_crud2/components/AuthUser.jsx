/** @format
 * Short instructions
 * ------------------
 * Use the given template with props to create a AuthUser component. Instead of using a template, use JSX.
 *
 * isLoggedIn is a prop boolean that indicates if the user is logged in or not.
 * onLogin is a prop function that will be called when the form is submitted and user is in "login" view. It should be called with the username and password as arguments.
 * onRegister is a prop function that will be called when the form is submitted and user is in the "register" view. It should be called with the username and password as arguments.
 * onLogout is a prop function that will be called when the logout link is clicked. It should be called with no arguments.
 * 
  The functionality of this component is two fold: 
  1. Display a link that toggles between "Go to login", "Go to register", and "Logout" depending on the value of the isLoggedIn prop: By default, it is "Go to register", when the user is not logged in.  
  - User logged in: display "Logout". The link should emit a logout event when clicked.
  - User not logged in and in login: display "Go to register". 
  - User not logged in and in register: display "Go to login".
  
  2. When user is trying to log in or register, the component should display a form with two input fields and a submit button. The form should have an id of "auth-form". It should submit the username and password to the submit function when submitted. The input fields should be required.

  - One input field for username with an id of "username", name of "auth-username" and type of "text".
  - One input field for password with an id of "password", name of "auth-password" and type of "password".
  - A submit button with a class of "btn-auth" with the text "login" or "register" depending on the current state of the component. If the user is trying to login, the button should say "login" and emit a "login" event with the username and password. If the user is trying to register, the button should say "register" and emit a "register" event with the username and password.

  Once user is logged in or registered, the form should be hidden and the link should change to "Logout". 

 *
 * REMEMBER: use the correct ids, classes and attributes in the correct places to pass the tests.
 */
import React, {useState} from 'react';

export const AuthUser = ({isLoggedIn, onLogin, onRegister, onLogout}) => {
  const [view, setView] = useState("login");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if( view === "login")
    {
      onLogin(userName, password);
    } else if (view === "register")
    {
      onRegister(userName, password);
    }
    setUsername("");
    setPassword("");
  };

  if(isLoggedIn) {
    return (
      <div id="auth-user">
        <a
        id="logout"
        href='#'
        className='btn-logout'
        onClick={(e) => {e.preventDefault(); onLogout(); }}>
          Logout
        </a>
      </div>
    );
  }

  //Show this form if the user is not logged in
  return (
  <div id='auth-user'>
    <form id='auth-form' onSubmit={handleFormSubmit}>
      <label htmlFor='username'>Username:</label>
      <input
      type='text'
      id='username'
      value={userName}
      onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor='password'>Password:</label>
      <input
      type='text'
      id='password'
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      />

      <button type='submit' id='auth-submit' className='btn-auth'>
        {view === "login" ? "Login" : "Register"}
      </button>
    </form>
    <a
    id='toggle-view'
    href='#'
    className='btn-linkauth'
    onClick={(e) => {
      e.preventDefault();
      setView(view === "login" ? "register" : "login")
    }}
    >
      {view === "login" ? "register" : "login"}
    </a>
  </div>
  );
};
export default AuthUser;
