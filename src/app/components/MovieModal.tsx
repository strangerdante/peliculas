import Image from "next/image";
import RatingCircle from "./RatingCircle";

interface MovieModalProps {
  movie: {
    id: number;
    title: string;
    release_date: string;
    vote_average: number;
    poster_path: string;
    overview: string;
  };
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
}

export default function MovieModal({
  movie,
  onClose,
  isFavorite,
  onToggleFavorite,
}: MovieModalProps) {
  return (
    <div className="fixed inset-0 bg-black backdrop-filter backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-200 dark:bg-neutral-800 rounded-lg p-4 max-w-2xl w-full mx-4">
        <div className="flex justify-end">
          <button onClick={onClose} className="dark:text-white text-2xl">
            &times;
          </button>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="flex justify-center w-full md:w-1/2 mb-4 md:mb-0">
            <div className="relative h-56 sm:h-96 w-64">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="md:ml-6 md:w-1/2">
            <h2 className="text-xl sm:text-2xl font-semibold dark:text-white mb-2">
              {movie.title}
            </h2>
            <p className="dark:text-white text-sm mb-4">{movie.overview}</p>
            <p className="dark:text-white text-sm mb-4">
              Fecha de estreno:{" "}
              {new Date(movie.release_date).toLocaleDateString("es-ES", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <RatingCircle rating={movie.vote_average} size={40} />
                <span className="ml-2 dark:text-white">Rating</span>
              </div>
              <button
                onClick={onToggleFavorite}
                className="flex flex-col items-center transition-transform duration-200 hover:scale-110"
                title={
                  isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"
                }
              >
                <Image
                  src={isFavorite ? "/favorite-filled.svg" : "/favorite.svg"}
                  alt="Favorite icon"
                  className="dark:invert transition-opacity duration-200 hover:opacity-80"
                  width={26}
                  height={26}
                  priority
                />
                <span className="mt-1 dark:text-white">
                  {isFavorite ? "Guardada" : "Guardar"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
