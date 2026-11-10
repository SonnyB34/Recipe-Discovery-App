import { createContext, useCallback, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    
    const [favorites, setFavorites] = useLocalStorage('favorites', []);

    const addFavorite = useCallback((id) => {
        setFavorites((prev) => prev.includes(id) ? prev : [...prev, id]);
    }, [setFavorites]);

    const removeFavorite = useCallback((id) => {
        setFavorites((prev) => prev.filter((favId) => favId !== id));
    }, [setFavorites]);

    const isFavorite = useCallback((id) => favorites.includes(id), [favorites]);

    const value = useMemo(() => ({ favorites, addFavorite,removeFavorite, isFavorite }), [favorites, addFavorite, removeFavorite, isFavorite]);

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}

// any component can access the favorites
export function useFavorites() {
    const context = useContext(FavoritesContext);

    // If context is undefined, this component is outside the Provider
    if(!context) {
        throw new Error('useFavorites must be used inside a FavoritesProvider');
    }

    return context;
}