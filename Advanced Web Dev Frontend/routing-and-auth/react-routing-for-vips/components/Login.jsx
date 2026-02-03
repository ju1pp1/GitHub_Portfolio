/**
 * Login component that handles user authentication.
 *
 * @component
 * @example
 * return (
 *   <Login />
 * )
 *
 * @returns {JSX.Element} The rendered Login component.
 *
 * @description
 * This component provides a login form for users to authenticate. It uses React hooks to manage state and Redux for dispatching login actions. Upon successful login, the user is navigated to the "/vip" route.
 *
 * @function
 * @name Login
 *
 * @property {string} username - The username input value.
 * @property {string} password - The password input value.
 * @property {function} setUsername - Function to update the username state.
 * @property {function} setPassword - Function to update the password state.
 * @property {function} handleLogin - Function to handle form submission and authentication.
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.username === username && storedUser.password === password) {
      dispatch({ type: "LOGIN", payload: { username } });
      navigate("/vip");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="container">
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
