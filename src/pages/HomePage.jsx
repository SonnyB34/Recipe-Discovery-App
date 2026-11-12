import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { API } from '../api';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

export default function HomePage() {
  // Fetch all food categories
  const { data, loading, error } = useFetch(`${API}/categories.php`);

  // If loading show spinner
  if (loading) return <Spinner />;

  // If error show error
  if (error) return <ErrorMessage message={error} />;

  const categories = data?.categories ?? [];

  return (
    <section>
      <h1>Categories</h1>
      <div className="grid">
        {categories.map((cat) => (
          <Link
            key={cat.idCategory}
            to={`/category/${cat.strCategory}`}
            className="card">
            <img src={cat.strCategoryThumb} alt={cat.strCategory} />
            <h3>{cat.strCategory}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
