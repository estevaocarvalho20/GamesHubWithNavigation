import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section aria-labelledby="not-found-heading">
      <h2 id="not-found-heading">Page not found</h2>
      <p>The page you requested could not be found.</p>
      <Link to="/">Return home</Link>
    </section>
  );
}
