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
  const { favorites, removeFromFavorites, isMovieFavorite, clearAllFavorites } = useFavorites();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedMovie) {
      removeFromFavorites(selectedMovie.id);
      setSelectedMovie(null);
    }
  };

  const handleRemoveFromFavorites = (e: React.MouseEvent, movieId: number) => {
    e.stopPropagation();
    removeFromFavorites(movieId);
  };

  const handleClearAllFavorites = () => {
    clearAllFavorites();
    setShowConfirmClear(false);
  };

  return (
    <div className="bg-gray-800 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Menu />
        <div className="flex justify-between items-center mt-20 mb-6">
          <h1 className="text-2xl font-bold text-white">
            Mis Películas Favoritas
          </h1>
          {favorites.length > 0 && (
            <button
              onClick={() => setShowConfirmClear(true)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm"
            >
              Limpiar Todo
            </button>
          )}
        </div>
        
        {favorites.length === 0 ? (
          <div className="text-center py-10 text-white">
            <div className="mb-4">
              <svg
                className="mx-auto h-16 w-16 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <p className="text-xl font-semibold mb-2">
              No tienes películas favoritas guardadas
            </p>
            <p className="text-gray-400">
              Agrega películas a tus favoritos desde la página principal para verlas aquí
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-400">
                Tienes {favorites.length} película{favorites.length !== 1 ? 's' : ''} en tus favoritos
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-8">
              {favorites.map((movie) => (
                <div
                  key={movie.id}
                  className="w-full cursor-pointer transform transition duration-300 hover:scale-105"
                  onClick={() => handleMovieClick(movie)}
                >
                  <div className="relative h-80 w-full rounded-xl overflow-hidden shadow-2xl">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                      className="object-cover"
                    />
                    {/* Etiqueta del año */}
                    <div className="absolute bottom-3 right-3 bg-yellow-400 text-black px-2 py-1 rounded-md text-xs font-bold shadow-lg">
                      {new Date(movie.release_date).getFullYear()}
                    </div>
                    {/* Botón de favoritos */}
                    <button
                      onClick={(e) => handleRemoveFromFavorites(e, movie.id)}
                      className="absolute top-3 right-3 p-2 bg-black bg-opacity-60 rounded-full transition-all duration-200 hover:scale-110 hover:bg-opacity-80 backdrop-blur-sm"
                      title="Eliminar de favoritos"
                    >
                      <Image
                        src="/favorite-filled.svg"
                        alt="Remove from favorites"
                        className="invert transition-opacity duration-200"
                        width={18}
                        height={18}
                        priority
                      />
                    </button>
                    {/* Rating */}
                    <div className="absolute top-3 left-3">
                      <RatingCircle rating={movie.vote_average} size={36} />
                    </div>
                    {/* Gradiente inferior para mejor legibilidad del año */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                  </div>
                  <div className="pt-3 px-1">
                    <h2 className="text-base font-bold text-white line-clamp-2 mb-1 leading-tight">
                      {movie.title}
                    </h2>
                    <p className="text-sm text-gray-400 font-medium">
                      {new Date(movie.release_date).toLocaleDateString("es-ES", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        
        {/* Modal de confirmación para limpiar favoritos */}
        {showConfirmClear && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4 text-white">
                ¿Confirmar eliminación?
              </h3>
              <p className="text-gray-400 mb-6">
                ¿Estás seguro de que quieres eliminar todas las películas de tus favoritos? 
                Esta acción no se puede deshacer.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowConfirmClear(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleClearAllFavorites}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Eliminar Todo
                </button>
              </div>
            </div>
          </div>
        )}
        
        {selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            onClose={handleCloseModal}
            isFavorite={isMovieFavorite(selectedMovie.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </div>
    </div>
  );
}
