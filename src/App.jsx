import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import RecipePage from './pages/RecipePage';
import FavoritesPage from './pages/FavoritesPage';
import SearchPage from './pages/SearchPage';

import './App.css'

function App() {
  

  return (
    <>
    
      <Navbar />

      <main className='container'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/category/:categoryName' element={<CategoryPage />} />
          <Route path='/recipe/:recipeId' element={<RecipePage />} />
          <Route path='/favorites' element={<FavoritesPage />} />
          <Route path='/search' element={<SearchPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
