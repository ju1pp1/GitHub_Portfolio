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
        <Link to="/about" className="nav-link"> About page</Link> or 
        <Link to="/posts" className="nav-link"> reading some Posts</Link>.
      </p>
    </div>
  );
}
