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

  // Cargar favoritos del localStorage al iniciar
  useEffect(() => {
    const storedFavorites = localStorage.getItem("movieFavorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("movieFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie: Movie) => {
    setFavorites((prev) => {
      if (!prev.some((fav) => fav.id === movie.id)) {
        return [...prev, movie];
      }
      return prev;
    });
  };

  const removeFromFavorites = (movieId: number) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isMovieFavorite = (movieId: number) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isMovieFavorite,
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
