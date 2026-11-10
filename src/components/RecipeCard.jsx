import { Link } from 'react-router-dom';

export default function RecipeCard({ meal }) {
  return (
    <Link to={`/recipe/${meal.idMeal}`} className="card">
      <img src={meal.strMealThumb} alt={meal.strMeal} loading="lazy" />
      <h3>{meal.strMeal}</h3>
    </Link>
  );
}
