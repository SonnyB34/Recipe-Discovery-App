import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

export default function Navbar() {
  // remembers that the user is typing in the search box
  const [query, setQuery] = useState('');

  // useNavigate gives us a function to jump to another page
  const navigate = useNavigate();

  const { favorites } = useFavorites();

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = query.trim(); // removes extra spaces
    if (!trimmed) return; // do nothing if the box is empty

    navigate(`/search?query=${encodeURIComponent(trimmed)}`);
    setQuery('');
  };
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        Discover Recipe
      </Link>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          placeholder="Search recipe..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/favorites">❤️ Favorites ({favorites.length})</NavLink>
      </div>
    </nav>
  );
}
