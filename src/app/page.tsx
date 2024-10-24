"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import RatingCircle from "./components/RatingCircle";
import FilterComponent from "./components/FilterComponent";
import Carousel from "./components/Carousel";
import Menu from "./components/Menu";
import MovieModal from "./components/MovieModal";
import { useFavorites } from "./components/FavoritesContext";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
  genre_ids: number[];
  overview: string;
}

const API_KEY = "4b11c9885761326b77c2d928cced28a3";

export default function Home() {
  // Estados para el manejo de películas y filtros
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Hook personalizado para manejar favoritos
  const { addToFavorites, removeFromFavorites, isMovieFavorite } =
    useFavorites();

  // Efecto para cargar películas al montar el componente y cuando cambian los filtros
  useEffect(() => {
    fetchMovies();
  }, [currentPage, selectedGenre]);

  // Función para obtener películas de la API
  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      let url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=${currentPage}`;

      if (selectedGenre) {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=es-ES&page=${currentPage}&with_genres=${selectedGenre}`;
      }

      const response = await axios.get(url);

      if (currentPage === 1) {
        setMovies(response.data.results);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      }

      setTotalPages(response.data.total_pages);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setIsLoading(false);
    }
  };

  // Efecto para filtrar películas cuando cambia la búsqueda
  useEffect(() => {
    const filtered = movies.filter((movie) => {
      const matchesKeyword = movie.title
        .toLowerCase()
        .includes(searchKeyword.toLowerCase());
      return matchesKeyword;
    });
    setFilteredMovies(filtered);
  }, [searchKeyword, movies]);

  // Manejadores de eventos
  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
    setMovies([]);
  };

  const handleSearchChange = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const loadMoreMovies = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent, movie: Movie) => {
    e.stopPropagation(); // Evita que se abra el modal al hacer clic en el botón de favoritos
    if (isMovieFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div className="dark:bg-gray-800 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Menu />
        <Carousel />
        <FilterComponent
          onGenreChange={handleGenreChange}
          onSearchChange={handleSearchChange}
        />
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-200 dark:bg-gray-600 rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-200"
              onClick={() => handleMovieClick(movie)}
            >
              <div className="relative h-64 w-full">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  priority={movie.id <= 4} // Prioriza la carga de las primeras 4 imágenes
                />
              </div>
              <div className="p-4 dark:text-white">
                <h2 className="text-base sm:text-xl font-semibold mb-2 line-clamp-2">
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
                    onClick={(e) => handleFavoriteClick(e, movie)}
                    className="flex flex-col items-center transition-transform duration-200 hover:scale-110"
                    title={
                      isMovieFavorite(movie.id)
                        ? "Quitar de favoritos"
                        : "Agregar a favoritos"
                    }
                  >
                    <Image
                      src={
                        isMovieFavorite(movie.id)
                          ? "/favorite-filled.svg"
                          : "/favorite.svg"
                      }
                      alt="Favorite icon"
                      className="dark:invert transition-opacity duration-200 hover:opacity-80"
                      width={26}
                      height={26}
                      priority
                    />
                    <span className="mt-1">
                      {isMovieFavorite(movie.id) ? "Guardada" : "Guardar"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            onClose={handleCloseModal}
            isFavorite={isMovieFavorite(selectedMovie.id)}
            onToggleFavorite={(e) => handleFavoriteClick(e, selectedMovie)}
          />
        )}

        {currentPage < totalPages && filteredMovies.length > 0 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMoreMovies}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Cargando...
                </span>
              ) : (
                "Cargar más películas"
              )}
            </button>
          </div>
        )}

        {filteredMovies.length === 0 && !isLoading && (
          <div className="text-center py-10 dark:text-white">
            <p className="text-xl font-semibold">No se encontraron películas</p>
            <p className="mt-2">
              Intenta con otros términos de búsqueda o filtros
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
