import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { API } from '../api';
import RecipeCard from '../components/RecipeCard';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

export default function CategoryPage() {
  // useParams reads the changing part of the address
  const { categoryName } = useParams();

  // fetch every recipe in that category
  const { data, loading, error } = useFetch(
    `${API}/filter.php?c=${encodeURIComponent(categoryName)}`,
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  const meals = data?.meals;
  return (
    <section>
      <h1>{categoryName} Recipes</h1>

      {meals.length === 0 ? (
        <p>No recipes found in this category!</p>
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
