/**
 * Register component allows users to create a new account.
 * It uses local state to manage the username and password inputs,
 * and upon form submission, it saves the user data to localStorage,
 * dispatches a login action to the Redux store, and navigates to the VIP page.
 *
 * @component
 * @example
 * return (
 *   <Register />
 * )
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify({ username, password }));
    dispatch({ type: "LOGIN", payload: { username } });
    navigate("/vip");
  };

  return (
    <div className="container">
      <h2>Register a new user</h2>
      <form onSubmit={handleRegister}>
        <input type="text" name="username" placeholder="Username"  value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
