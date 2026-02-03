/**
 * NotFound component renders a 404 error message.
 *
 * @component
 * @example
 * return (
 *   <NotFound />
 * )
 */

export default function NotFound() {
    return (
      <div className="container">
        <h1>404 - Page Not Found</h1>
        <p>Oops! The page you are looking for does not exist.</p>
      </div>
    );
  }
  