import { Link } from "react-router-dom";
import SearchBar from "../SearBar/SearchBar";
import React from "react";
import { NavBarProps } from "../../Models/interfaces";

const NavBar: React.FC<NavBarProps> = (props) => {
  const handleRandom = () => {
    const min = 1;
    const max = 826;

    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const characterRep = props.characters.find(
      (char) => char.id === randomNumber
    );

    if (characterRep) {
      return handleRandom();
    }

    props.onSearch(randomNumber); // Llama onSearch con un number
  };

  return (
    <div className="bg-transparent flex p-6 top-0 w-full fixed z-50">
      <div className="flex items-center justify-between mr-auto w-full">
        <div className="flex">
          <Link
            to="/about"
            className="min-w-[80px] my-0 mx-2 p-3.5 border-4 border-colorBorderForm rounded-xl no-underline text-white font-bold text-2xl cursor-pointer hover:border-white hover:scale-105 transition-transform duration-200 ease-in-out"
          >
            About
          </Link>
          <Link
            to="/home"
            className="min-w-[80px] my-0 mx-2 p-3.5 border-4 border-colorBorderForm rounded-xl no-underline text-white font-bold text-2xl cursor-pointer hover:border-white hover:scale-105 transition-transform duration-200 ease-in-out"
          >
            Home
          </Link>
          <button
            onClick={props.handleLogout}
            className="min-w-[80px] my-0 mx-2 p-3.5 border-4 border-colorBorderForm rounded-xl no-underline text-white font-bold text-2xl cursor-pointer hover:border-white hover:scale-105 transition-transform duration-200 ease-in-out"
          >
            Logout
          </button>
        </div>
        <SearchBar onSearch={props.onSearch} />
        <div className="flex">
          <button
            onClick={handleRandom}
            className="min-w-[80px] my-0 mx-2 p-3.5 bg-colorButtonLogin border-4 border-black border-solid rounded-xl no-underline text-black font-bold text-2xl cursor-pointer hover:bg-colorBorderForm hover:scale-105 transition-transform duration-200 ease-in-out"
          >
            Random
          </button>
          <Link
            to="/favorites"
            className="min-w-[80px] my-0 mx-2 p-3.5 bg-colorButtonLogin border-4 border-black border-solid rounded-xl no-underline text-black font-bold text-2xl cursor-pointer hover:bg-colorBorderForm hover:scale-105 transition-transform duration-200 ease-in-out"
          >
            Favorites
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
