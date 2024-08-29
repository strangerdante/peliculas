import { useState, useEffect } from "react";
import Link from "next/link";
import Modal from "./Modal";

const NavigationMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  useEffect(() => {
    // Comprobar las preferencias del usuario
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-30 p-4 dark:bg-gray-800 bg-white">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex flex-col items-center pr-6">
              <span className="dark:text-white font-bold text-2xl tracking-wider">
                QUICKBET
              </span>
              <div className="flex items-center">
                <div className="w-4 h-0.5 bg-yellow-400 mr-2"></div>
                <span className="text-yellow-400 font-bold text-sm tracking-wider">
                  MOVIES
                </span>
                <div className="w-4 h-0.5 bg-yellow-400 ml-2"></div>
              </div>
            </div>
          </div>

          {/* Menu escritorio */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/popular"
              className="dark:text-white hover:text-yellow-400 dark:hover:text-yellow-400 transition-colors"
            >
              Popular
            </Link>
            <Link
              href="/favorites"
              className="dark:text-white hover:text-yellow-400 dark:hover:text-yellow-400 transition-colors"
            >
              Favorites
            </Link>
          </div>

          {/* Botones de menu para moviles y modo oscuro */}
          <div className="flex items-center">
            <button className="text-white mr-4" onClick={toggleModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-gray-600 dark:fill-yellow-500 h-6 w-6"
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
            <button
              onClick={toggleDarkMode}
              className="h-10 w-10 rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-700 mr-4"
            >
              {darkMode ? (
                <svg
                  className="fill-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="fill-gray-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
              )}
            </button>
            {/* Boton hamburguesa */}
            <button className="text-white md:hidden" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke={darkMode ? "white" : "black"}
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
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke={darkMode ? "white" : "black"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4">
            <Link
              href="/popular"
              className="block dark:text-white hover:text-yellow-400 transition-colors py-2"
            >
              Popular
            </Link>
            <Link
              href="/favorites"
              className="block dark:text-white hover:text-yellow-400 transition-colors py-2"
            >
              Favorites
            </Link>
          </div>
        )}
      </nav>
      <Modal isOpen={isModalOpen} onClose={toggleModal} />
    </>
  );
};

export default NavigationMenu;
