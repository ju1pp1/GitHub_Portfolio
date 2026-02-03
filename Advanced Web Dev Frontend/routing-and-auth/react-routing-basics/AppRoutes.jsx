/**
 * AppRoutes component defines the routing structure for the application.
 * It uses react-router-dom for routing and react-redux for state management. You need to create the import for the React Router components you need.
 * 
 * Routes:
 * - "/" renders the Home component.
 * - "/about" renders the About component.
 * - "/posts" renders the Posts component.
 * - "*" renders the NotFound component for any undefined routes.
 * 
 * See: https://reactrouter.com/start/library/routing. 
 * 
 * @component
 */



// TODO: Add the necessary imports for the React Router components
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./components/Home";
import About from "./components/About";
import Posts from "./components/Posts";
import NotFound from "./components/NotFound";

export default function AppRoutes() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
