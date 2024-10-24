import { useState, useEffect } from "react";
import Link from "next/link";
import ModalRegistro from "./ModalRegistro";
import { useFavorites } from "./FavoritesContext";

const NavigationMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { favorites } = useFavorites();

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    // Asegurar que siempre esté en modo oscuro
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-30 backdrop-blur-lg bg-gray-900/80 border-b border-gray-700/50 shadow-lg transition-all duration-300">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo mejorado */}
            <div className="flex items-center group">
              <div className="flex flex-col items-center pr-6 ">
                <span className="text-white font-bold text-2xl tracking-wider bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                  JAMEL
                </span>
                <div className="flex items-center mt-1">
                  <div className="w-4 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 mr-2"></div>
                  <span className="text-yellow-400 font-semibold text-sm tracking-wider">
                    MOVIES
                  </span>
                  <div className="w-4 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 ml-2"></div>
                </div>
              </div>
            </div>

            {/* Menu escritorio mejorado */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="relative text-gray-300 hover:text-yellow-400 transition-all duration-300 font-medium group"
              >
                Inicio
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/favorites"
                className="relative text-gray-300 hover:text-yellow-400 transition-all duration-300 font-medium group flex items-center"
              >
                Favoritos
                {favorites.length > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                    {favorites.length}
                  </span>
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>

            {/* Botones de acción mejorados */}
            <div className="flex items-center space-x-3">
              {/* Botón de favoritos para móvil */}
              <Link
                href="/favorites"
                className="group md:hidden relative p-2 rounded-lg bg-gray-800 hover:bg-yellow-900/30 transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 fill-gray-300 group-hover:fill-yellow-400 transition-colors duration-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                    {favorites.length}
                  </span>
                )}
              </Link>

              {/* Botón de usuario con efecto hover */}
              <button 
                className="group p-2 rounded-lg bg-gray-800 hover:bg-yellow-900/30 transition-all duration-300 hover:scale-110 hover:shadow-lg" 
                onClick={toggleModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-gray-300 group-hover:fill-yellow-400 h-5 w-5 transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>

              {/* Botón hamburguesa mejorado */}
              <button 
                className="group md:hidden p-2 rounded-lg bg-gray-800 hover:bg-yellow-900/30 transition-all duration-300 hover:scale-110" 
                onClick={toggleMobileMenu}
              >
                <div className="w-5 h-5 flex flex-col justify-center items-center">
                  {isMobileMenuOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-300 group-hover:text-yellow-400 transition-colors duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-300 group-hover:text-yellow-400 transition-colors duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Menu mobile mejorado con animación */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}>
            <div className="py-2 space-y-2 bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-700/50">
              <Link
                href="/"
                className="block px-4 py-3 text-gray-300 hover:text-yellow-400 hover:bg-yellow-900/20 transition-all duration-300 rounded-md mx-2 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Inicio
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <ModalRegistro isOpen={isModalOpen} onClose={toggleModal} />
    </>
  );
};

export default NavigationMenu;
