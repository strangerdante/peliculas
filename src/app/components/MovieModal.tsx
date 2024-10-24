import Image from "next/image";
import RatingCircle from "./RatingCircle";

interface MovieModalProps {
  movie: {
    id: number;
    title: string;
    release_date: string;
    vote_average: number;
    poster_path: string;
    backdrop_path?: string;
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
  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : `https://image.tmdb.org/t/p/w1280${movie.poster_path}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="relative bg-neutral-900 rounded-xl overflow-hidden max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] shadow-2xl overflow-y-auto">
        {/* Imagen de fondo con overlay más claro */}
        <div className="absolute inset-0">
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/60 to-neutral-900/30" />
        </div>

        {/* Contenido */}
        <div className="relative z-10 p-4 sm:p-6">
          {/* Botón cerrar */}
          <div className="flex justify-end mb-3 sm:mb-4">
            <button 
              onClick={onClose} 
              className="text-white/80 hover:text-white text-2xl sm:text-3xl transition-all duration-200 hover:scale-110 bg-black/40 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center backdrop-blur-sm"
            >
              &times;
            </button>
          </div>

          {/* Layout principal */}
          <div className="space-y-4">
            {/* Sección superior: Carátula + Info principal */}
            <div className="flex gap-4 lg:gap-8">
              {/* Portada de la película con corazón de favoritos */}
              <div className="flex-shrink-0 relative">
                <div className="relative w-32 h-48 sm:w-40 sm:h-60 lg:w-72 lg:h-[432px] shadow-2xl">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    fill
                    className="object-cover rounded-lg"
                    priority
                  />
                  <div className="absolute inset-0 rounded-lg ring-1 ring-white/20" />
                
                  {/* Botón de favoritos flotante */}
                  <button
                    onClick={onToggleFavorite}
                    className={`absolute top-1 right-1 sm:top-2 sm:right-2 w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 backdrop-blur-sm shadow-lg ${
                      isFavorite 
                        ? 'bg-red-600/90 hover:bg-red-700' 
                        : 'bg-black/60 hover:bg-black/80'
                    }`}
                    title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                  >
                    <Image
                      src={isFavorite ? "/favorite-filled.svg" : "/favorite.svg"}
                      alt="Icono de favorito"
                      className="invert"
                      width={14}
                      height={14}
                      priority
                    />
                  </button>
                </div>
              </div>

              {/* Información principal */}
              <div className="flex-1 text-white min-w-0 flex flex-col justify-start">
                {/* Título */}
                <div className="mb-4">
                  <h1 className="text-lg sm:text-2xl lg:text-4xl font-bold text-shadow leading-tight">
                    {movie.title}
                  </h1>
                </div>

                {/* Fecha de estreno y Rating */}
                <div className="mb-4 lg:mb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
                    {/* Fecha de estreno */}
                    <div className="bg-black/30 backdrop-blur-sm rounded-lg p-2 sm:p-3 lg:p-4 border border-white/20">
                      <p className="text-xs lg:text-sm text-gray-300 mb-1">Fecha de estreno</p>
                      <p className="text-xs sm:text-sm lg:text-lg font-medium">
                        {new Date(movie.release_date).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 sm:gap-3 bg-black/30 backdrop-blur-sm rounded-lg p-2 sm:p-3 lg:p-4 border border-white/20">
                      <RatingCircle rating={movie.vote_average} size={40} />
                      <div>
                        <p className="text-xs lg:text-sm text-gray-300">Calificación</p>
                        <p className="text-sm sm:text-lg lg:text-xl font-semibold">
                          {movie.vote_average.toFixed(1)}<span className="text-gray-400">/10</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sinopsis para desktop */}
                <div className="hidden lg:block">
                  <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <h3 className="text-lg font-semibold mb-3">Sinopsis</h3>
                    <p className="text-gray-200 leading-relaxed text-base">
                      {movie.overview}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sinopsis - Abajo en móvil, integrada en desktop */}
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20 text-white lg:hidden">
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Sinopsis</h3>
              <p className="text-gray-200 leading-relaxed text-sm sm:text-base">
                {movie.overview}
              </p>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
