import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { API } from '../api';
import RecipeCard from '../components/RecipeCard';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

export default function FavoritesPage() {
  // We only saved ID numbers, so we need to ask the kitchen for the details of each one
  const { favorites } = useFavorites();

  const [meals, setMeals] = useState([]); // the full recipes
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // No favorites? Nothing to fetch. Make sure the list is empty and stop.
    if (favorites.length === 0) {
      setMeals([]);
      return;
    }

    // `ignore` is a flag: if we leave the page before the answer arrives, we ignore the answer
    let ignore = false;

    async function loadFavorites() {
      setLoading(true);
      setError(null);

      try {
        // Make one request per favorite ID, all at the same time.
        // Promise.all waits until EVERY request is finished.
        const results = await Promise.all(
          favorites.map(async (id) => {
            const response = await fetch(`${API}/lookup.php?i=${id}`);
            if (!response.ok) {
              throw new Error(`Request failed (status ${response.status})`);
            }
            const json = await response.json();
            return json.meals ? json.meals[0] : null; // the recipe, or null if not found
          }),
        );

        // Throw away any nulls (recipes that weren't found)
        if (!ignore) setMeals(results.filter(Boolean));
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadFavorites();

    // Cleanup: if we leave the page, ignore any answers that come back late
    return () => {
      ignore = true;
    };
  }, [favorites]); // run again if the favorites list changes

  // The "no favorites" message the assignment asks for
  if (favorites.length === 0) {
    return (
      <section className="empty-state">
        <h1>Your Favorites</h1>
        <p>You haven't saved any recipes yet.</p>
        <Link to="/">Browse recipes and add some ❤️</Link>
      </section>
    );
  }

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <h1>Your Favorites</h1>
      <div className="grid">
        {meals.map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </section>
  );
}
