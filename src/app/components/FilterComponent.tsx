// components/FilterComponent.tsx
import React, { useState } from "react";

interface FilterComponentProps {
  onGenreChange: (genre: string) => void;
  onSearchChange: (keyword: string) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  onGenreChange,
  onSearchChange,
}) => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const genre = e.target.value;
    setSelectedGenre(genre);
    onGenreChange(genre);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
    onSearchChange(keyword);
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label
            htmlFor="genre-select"
            className="block mb-2 text-sm font-medium dark:text-gray-300"
          >
            Filtrar por Género
          </label>
          <select
            id="genre-select"
            value={selectedGenre}
            onChange={handleGenreChange}
            className="dark:bg-neutral-700 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">Todos los géneros</option>
            <option value="28">Acción</option>
            <option value="12">Aventura</option>
            <option value="16">Animación</option>
            <option value="35">Comedia</option>
            <option value="80">Crimen</option>
            <option value="99">Documental</option>
            <option value="18">Drama</option>
            <option value="10751">Familia</option>
            <option value="14">Fantasía</option>
            <option value="36">Historia</option>
            <option value="27">Terror</option>
            <option value="10402">Música</option>
            <option value="9648">Misterio</option>
            <option value="10749">Romance</option>
            <option value="878">Ciencia ficción</option>
            <option value="10770">Película de TV</option>
            <option value="53">Suspense</option>
            <option value="10752">Bélica</option>
            <option value="37">Western</option>
          </select>
        </div>
        <div className="flex-1">
          <label
            htmlFor="search-input"
            className="block mb-2 text-sm font-medium dark:text-gray-300"
          >
            Buscar por palabra clave
          </label>
          <input
            type="text"
            id="search-input"
            value={searchKeyword}
            onChange={handleSearchChange}
            placeholder="Buscar películas..."
            className="dark:bg-neutral-700 bg-gray-200  dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
