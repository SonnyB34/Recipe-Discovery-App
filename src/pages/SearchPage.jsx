import { useSearchParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { API } from '../api';
import RecipeCard from '../components/RecipeCard';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

export default function SearchPage() {
  // useSearchParams reads the part after the ? in the address.
  // For /search?query=Arrabiata, query is "Arrabiata".
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  // If there's a query, build the address. If not, pass null so useFetch stays still.
  const url = query ? `${API}/search.php?s=${encodeURIComponent(query)}` : null;

  const { data, loading, error } = useFetch(url);

  // Nothing typed? Give a gentle hint.
  if (!query) {
    return <p>Type a recipe name in the search bar above to get started.</p>;
  }

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  // When nothing matches, the API sends meals: null, so we fall back to an empty list
  const meals = data?.meals ?? [];

  return (
    <section>
      <h1>Results for "{query}"</h1>

      {meals.length === 0 ? (
        <p>No recipes found. Try another search!</p>
      ) : (
        <div className="grid">
          {meals.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </section>
  );
}
