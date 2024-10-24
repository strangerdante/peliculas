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

  // Configuración de películas por página (3 filas × 6 columnas en desktop)
  const moviesPerPage = 18;

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

      // Siempre reemplazamos las películas para mostrar solo la página actual
      setMovies(response.data.results);
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
    // Limitamos a las películas por página configuradas (3 filas en desktop)
    setFilteredMovies(filtered.slice(0, moviesPerPage));
  }, [searchKeyword, movies, moviesPerPage]);

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

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
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
    <div className="bg-gray-800 min-h-screen">
      <Menu />
      <Carousel />
      <div className="container mx-auto px-4 pt-8 pb-8">
        <FilterComponent
          onGenreChange={handleGenreChange}
          onSearchChange={handleSearchChange}
        />
        
        {/* Grid de películas en filas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-8">
          {filteredMovies.map((movie) => (
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
                  priority={movie.id <= 8}
                />
                {/* Etiqueta del año */}
                <div className="absolute bottom-3 right-3 bg-yellow-400 text-black px-2 py-1 rounded-md text-xs font-bold shadow-lg">
                  {new Date(movie.release_date).getFullYear()}
                </div>
                {/* Botón de favoritos */}
                <button
                  onClick={(e) => handleFavoriteClick(e, movie)}
                  className="absolute top-3 right-3 p-2 bg-black bg-opacity-60 rounded-full transition-all duration-200 hover:scale-110 hover:bg-opacity-80 backdrop-blur-sm"
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

        {selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            onClose={handleCloseModal}
            isFavorite={isMovieFavorite(selectedMovie.id)}
            onToggleFavorite={(e) => handleFavoriteClick(e, selectedMovie)}
          />
        )}

        {/* Paginación con botones anterior y siguiente */}
        {totalPages > 1 && filteredMovies.length > 0 && (
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={goToPreviousPage}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === 1 || isLoading}
            >
              Anterior
            </button>         
            <button
              onClick={goToNextPage}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === totalPages || isLoading}
            >
              Siguiente
            </button>
          </div>
        )}

        {filteredMovies.length === 0 && !isLoading && (
          <div className="text-center py-10 text-white">
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
