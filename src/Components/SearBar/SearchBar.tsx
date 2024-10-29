import { useState, ChangeEvent, KeyboardEvent } from "react";
import { SearchBarProps } from "../../Models/interfaces";

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [id, setId] = useState<string>("");

  // Maneja el cambio en el input
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  // Maneja el evento de presionar la tecla Enter
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // Convierte el id a número antes de llamar a onSearch
      const numericId = parseInt(id);
      if (!isNaN(numericId)) {
        onSearch(numericId);
      }
    }
  };

  return (
    <div className="w-[90%] mx-auto lg:mx-0 lg:w-1/3 flex p-6 items-center relative lg:justify-end">
      <input
        className="w-full h-10 rounded-lg border-solid border-4 border-white bg-transparent text-lg py-2 px-4 font-bold placeholder:text-white focus:outline-none text-white"
        type="search"
        placeholder="¿Dónde está el Sr. Pantalones de 💩?"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button
        className="z-[100] absolute right-4 bg-customDarkBlue border-4 border-white rounded-full w-14 h-14 p-2 focus:outline-none text-20 cursor-pointer transition-transform ease-in-out hover:scale-110 duration-200"
        onClick={() => {
          // Convierte el id a número antes de llamar a onSearch
          const numericId = parseInt(id);
          if (!isNaN(numericId)) {
            onSearch(numericId);
          }
        }}
      >
        ➕
      </button>
    </div>
  );
}
