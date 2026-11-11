import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { useFavorites } from '../context/FavoritesContext';
import { API } from '../api';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

export default function RecipePage() {
  const { recipeId } = useParams();

  // Fetch full details of specific recipe
  const { data, loading, error } = useFetch(`${API}/lookup.php?i=${recipeId}`);

  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  const meal = data?.meals?.[0];
  if (!meal) return <ErrorMessage message="Recipe not found!" />;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredients${i}`];
    const measure = meal[`strMeasure${i}`];

    if (name && name.trim()) {
      ingredients.push(
        `${measure ? measure.trim() : ''} ${name.trim()}`.trim(),
      );
    }
  }

  // The instructions come as a block of text split into lines
  const steps = meal.strInstructions
    .split('\n')
    .filter((line) => line.trim() !== ''); // get rid of empty lines

  // Recipe is already a favorite
  const favorite = isFavorite(meal.idMeal);

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(meal.idMeal);
    } else {
      addFavorite(meal.idMeal);
    }
  };

  return (
    <article className="recipe">
      <img src={meal.strMealThumb} alt={meal.strMeal} className="recipe-img" />

      <div className="recipe-info">
        <h1>{meal.strMeal}</h1>
        <p className="muted">
          {meal.strCategory} • {meal.strArea}
        </p>

        <button onClick={toggleFavorite} className={favorite}>
          {favorite ? '💔 Remove from Favorites' : '❤️ Add to Favorites'}
        </button>

        <h2>Ingredients</h2>
        <ul>
          {ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h2>Instructions</h2>
        {steps.map((step, index) => (
          <p key={index}>{step}</p>
        ))}
      </div>
    </article>
  );
}
