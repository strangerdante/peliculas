import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import RatingCircle from "./RatingCircle";

// Styles del swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
}

const API_KEY = "4b11c9885761326b77c2d928cced28a3";

export default function LatestMoviesCarousel() {
  const [latestMovies, setLatestMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchLatestMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=1`
        );
        setLatestMovies(response.data.results.slice(0, 3));
      } catch (error) {
        console.error("Error fetching latest movies:", error);
      }
    };
    fetchLatestMovies();
  }, []);

  return (
    <div className="mb-12">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={{}}
        pagination={{
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active bg-yellow-500",
        }}
        autoplay={{ delay: 5000 }}
        className="h-[600px] [&_.swiper-button-next]:text-yellow-500 [&_.swiper-button-prev]:text-yellow-500 [&_.swiper-pagination-bullet]:bg-yellow-500 rounded-lg"
        loop={true}
      >
        {latestMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative h-full w-full">
              <Image
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                fill
                sizes="100vw"
                className="object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-8">
                <h3 className="text-4xl font-bold text-white mb-2">
                  {movie.title}
                </h3>
                <p className="text-sm sm:text-xl text-white mb-4">
                  {movie.overview}
                </p>
                <div className="flex items-center">
                  <RatingCircle rating={movie.vote_average} size={60} />
                  <p className="ml-4 text-white text-lg sm:text-xl">
                    {new Date(movie.release_date).toLocaleDateString("es-ES", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
