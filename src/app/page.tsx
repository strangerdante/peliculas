"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import RatingCircle from "./components/RatingCircle";
import FilterComponent from "./components/FilterComponent";
import Carousel from "./components/Carousel";
import Menu from "./components/Menu";
import MovieModal from "./components/MovieModal";

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
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, [currentPage, selectedGenre]);

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

  useEffect(() => {
    const filtered = movies.filter((movie) => {
      const matchesKeyword = movie.title
        .toLowerCase()
        .includes(searchKeyword.toLowerCase());
      return matchesKeyword;
    });
    setFilteredMovies(filtered);
  }, [searchKeyword, movies]);

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

  return (
    <div className="dark:bg-gray-800">
      <div className="container mx-auto px-4 py-8 ">
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
                  <p className="flex flex-col items-center">
                    Favorites:
                    <div className="flex items-center">
                      <Image
                        src="/favorite.svg"
                        alt="Favorite icon"
                        className="dark:invert"
                        width={26}
                        height={26}
                        priority
                      />
                    </div>
                  </p>
                </div>
              </div>
            </div>
          ))}
          {selectedMovie && (
            <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
          )}
        </div>
        {currentPage < totalPages && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMoreMovies}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
              disabled={isLoading}
            >
              {isLoading ? "Cargando..." : "Cargar más películas"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
