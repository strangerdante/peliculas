import React, { createContext, useContext, useState, useEffect } from "react";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
  genre_ids: number[];
  overview: string;
}

interface FavoritesContextType {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isMovieFavorite: (movieId: number) => boolean;
  clearAllFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar favoritos del localStorage al iniciar
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem("movieFavorites");
      if (storedFavorites) {
        const parsedFavorites = JSON.parse(storedFavorites);
        if (Array.isArray(parsedFavorites)) {
          setFavorites(parsedFavorites);
        }
      }
    } catch (error) {
      console.error("Error al cargar favoritos del localStorage:", error);
      // Si hay error, limpiar localStorage corrupto
      localStorage.removeItem("movieFavorites");
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Guardar favoritos en localStorage cuando cambien (solo después de cargar)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("movieFavorites", JSON.stringify(favorites));
      } catch (error) {
        console.error("Error al guardar favoritos en localStorage:", error);
      }
    }
  }, [favorites, isLoaded]);

  const addToFavorites = (movie: Movie) => {
    setFavorites((prev) => {
      if (!prev.some((fav) => fav.id === movie.id)) {
        const newFavorites = [...prev, movie];
        console.log(`Película "${movie.title}" agregada a favoritos`);
        return newFavorites;
      }
      return prev;
    });
  };

  const removeFromFavorites = (movieId: number) => {
    setFavorites((prev) => {
      const movieToRemove = prev.find((movie) => movie.id === movieId);
      if (movieToRemove) {
        console.log(`Película "${movieToRemove.title}" eliminada de favoritos`);
      }
      return prev.filter((movie) => movie.id !== movieId);
    });
  };

  const isMovieFavorite = (movieId: number) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    console.log("Todos los favoritos han sido eliminados");
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isMovieFavorite,
        clearAllFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
