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
    <div className="relative mb-0 pt-16 md:pt-20">
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{}}
          pagination={{
            clickable: true,
            bulletActiveClass: "swiper-pagination-bullet-active bg-yellow-500",
          }}
          autoplay={{ delay: 5000 }}
          className="h-[400px] md:h-[500px] lg:h-[600px] [&_.swiper-button-next]:text-yellow-500 [&_.swiper-button-prev]:text-yellow-500 [&_.swiper-pagination-bullet]:bg-yellow-500 [&_.swiper-button-next]:hidden [&_.swiper-button-prev]:hidden md:[&_.swiper-button-next]:block md:[&_.swiper-button-prev]:block"
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
                className="object-cover"
                priority
              />
              
              {/* Gradiente superior sutil */}
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-gray-800/60 to-transparent z-10"></div>
              
              {/* Gradiente inferior para integración con el fondo - más abajo */}
              <div className="absolute inset-x-0 bottom-0 h-24 md:h-32 lg:h-36 bg-gradient-to-t from-gray-800 via-gray-800/90 via-gray-800/60 to-transparent z-20"></div>
              
              {/* Overlay oscuro para mejor legibilidad del contenido */}
              <div className="absolute inset-0 bg-black/20 z-15"></div>
              
              {/* Contenido de la película */}
              <div className="absolute inset-0 flex flex-col justify-end z-30">
                <div className="container mx-auto px-4 pb-8">
                  <h3 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 md:mb-4 drop-shadow-lg leading-tight">
                    {movie.title}
                  </h3>
                  <p className="text-sm md:text-lg lg:text-xl text-white mb-4 md:mb-6 max-w-full md:max-w-3xl leading-relaxed drop-shadow-md line-clamp-3 md:line-clamp-none">
                    {movie.overview}
                  </p>
                  <div className="flex items-center">
                    <RatingCircle rating={movie.vote_average} size={40} />
                    <p className="ml-3 md:ml-4 text-white text-sm md:text-lg lg:text-xl drop-shadow-md">
                      {new Date(movie.release_date).toLocaleDateString("es-ES", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        </Swiper>
      </div>
    </div>
  );
}
