import Image from "next/image";
import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [activeForm, setActiveForm] = useState<"login" | "signup">("signup");
  const switchForm = (form: "login" | "signup") => setActiveForm(form);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-40 p-4">
      <div className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-md rounded-lg w-full max-w-[800px] overflow-hidden relative">
        {/* Boton back */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 flex items-center text-white font-semibold py-2 px-4"
        >
          <span className="inline-flex items-center justify-center w-5 h-5 mr-2 border-2 border-white rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          Atras
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Lado izquierdo */}
          <div className="w-full md:w-1/2 p-4 md:p-8">
            <div className="flex justify-center mb-4 p-2 mt-10">
              <button
                className={`px-4 py-2 rounded-lg mr-2 ${
                  activeForm === "signup"
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-800 text-white"
                }`}
                onClick={() => switchForm("signup")}
              >
                Inscríbete
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  activeForm === "login"
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-800 text-white"
                }`}
                onClick={() => switchForm("login")}
              >
                Conectarse
              </button>
            </div>
            {activeForm === "signup" ? (
              <div>
                <button className="w-full bg-yellow-400 text-black py-2 rounded mb-4">
                  Regístrese con su correo electrónico
                </button>
                <p className="mt-4 text-sm text-center text-white">
                  Si tiene alguna pregunta, escriba a support@example.com
                </p>
              </div>
            ) : (
              <form className="text-sm sm:text-base">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-1 sm:p-2 mb-2 border rounded"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-1 sm:p-2 mb-4 border rounded"
                />
                <button className="w-full bg-yellow-400 py-1.5 sm:py-2 rounded text-black text-xs sm:text-sm">
                  Continuar
                </button>
                <p className="mt-2 sm:mt-4 text-center text-white">
                  Si tiene alguna pregunta, escriba a support@example.com
                </p>
              </form>
            )}
          </div>

          {/* Lado derecho */}
          <div className="w-full md:w-1/2 bg-gray-800 text-white p-4 md:p-8">
            {activeForm === "signup" ? (
              <>
                <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
                  ¡Bienvenido!
                </h2>
                <p className="mb-4 text-center text-sm md:text-base">
                  🍿¿Listo para descubrir un universo cinematográfico?
                  Regístrese ahora y comience su viaje con nosotros.
                </p>
                <div className="flex justify-center">
                  <Image
                    src="https://i.ibb.co/GPtcfbT/register.png"
                    alt="Register"
                    width={300}
                    height={200}
                    layout="responsive"
                  />
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
                  ¡Bienvenido de nuevo!
                </h2>
                <p className="mb-4 text-center text-sm md:text-base">
                  🍿¿Listo para sumergirte en el mundo del entretenimiento sin
                  límites? Introduce tus credenciales y ¡que empiece la aventura
                  cinematográfica!
                </p>
                <div className="flex justify-center">
                  <Image
                    src="https://i.ibb.co/wJ1nrs9/login.png"
                    alt="Login"
                    width={300}
                    height={200}
                    layout="responsive"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
