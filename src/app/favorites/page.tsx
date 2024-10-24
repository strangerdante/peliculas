"use client";
import { useFavorites } from "../components/FavoritesContext";
import Image from "next/image";
import RatingCircle from "../components/RatingCircle";
import MovieModal from "../components/MovieModal";
import { useState } from "react";
import Menu from "../components/Menu";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
  genre_ids: number[];
  overview: string;
}

export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="dark:bg-gray-800 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Menu />
        <h1 className="text-2xl font-bold mb-6 dark:text-white mt-20">
          Mis Películas Favoritas
        </h1>

        {favorites.length === 0 ? (
          <p className="text-center dark:text-white">
            No tienes películas favoritas guardadas.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6">
            {favorites.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-200 dark:bg-gray-600 rounded-lg shadow-md overflow-hidden cursor-pointer"
                onClick={() => handleMovieClick(movie)}
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4 dark:text-white">
                  <h2 className="text-base sm:text-xl font-semibold mb-2">
                    {movie.title}
                  </h2>
                  <p className="dark:text-white mb-2 text-xs sm:text-sm">
                    {new Date(movie.release_date).toLocaleDateString("es-ES", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <div className="flex flex-row justify-evenly text-sm text-center dark:text-white">
                    <div className="flex flex-col items-center">
                      <RatingCircle rating={movie.vote_average} size={40} />
                      <p className="mt-1">Rating</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromFavorites(movie.id);
                      }}
                      className="flex flex-col items-center text-black hover:text-gray-600 dark:text-white"
                    >
                      <Image
                        src="/favorite-filled.svg"
                        alt="Remove from favorites"
                        width={26}
                        height={26}
                        className="dark:invert text-red-500"
                        priority
                      />
                      <span>Eliminar</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedMovie && (
          <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
}
