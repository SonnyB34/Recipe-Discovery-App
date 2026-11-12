import { Link } from 'react-router-dom';

// Shown when someone types an address that doesn't exist
export default function NotFoundPage() {
  return (
    <section className="empty-state">
      <h1>404: Page not found</h1>
      <p>That page doesn't exist.</p>
      <Link to="/">Go back home</Link>
    </section>
  );
}
