/**
 * Component to display the last visited pages.
 *
 * This component uses the `useSelector` hook from `react-redux` to access the
 * `lastVisitedPages` state from the Redux store. It maps over the `lastVisitedPages`
 * array and creates a list of links to the last visited pages.
 *
 * @component
 * @example
 * return (
 *   <LastVisitedPages />
 * )
 */
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function LastVisitedPages() {
  const lastVisitedPages = useSelector((state) => state.lastVisitedPages);
  if(!lastVisitedPages || !lastVisitedPages.length) return null;

  return (
    <div className="container">
      <h3>Last Visited Pages:</h3>
      <div className="last-visited-container">
        {lastVisitedPages.map((page, index) => (
          <Link key={index} to={page} className="last-visited-link">
            {page}
          </Link>
        ))}
      </div>
    </div>
  );
}
