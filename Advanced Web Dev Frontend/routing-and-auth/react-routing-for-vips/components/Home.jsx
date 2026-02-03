/**
 * Home component renders the home page with navigation links to register and login pages.
 *
 * @component
 * @example
 * return (
 *   <Home />
 * )
 *
 * @returns {JSX.Element} The rendered Home component.
 */

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container">
      <h1>Home Page</h1>
      <p>
        The shortest route takes us Home, another route takes us to 
        <Link to="/register" className="nav-link"> registering</Link> or 
        <Link to="/login" className="nav-link"> login</Link>.
      </p>
    </div>
  );
}
