import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearBar/SearchBar";
import { NavBarProps } from "../../Models/interfaces";
import { Menu, X } from "lucide-react";

const NavBar: React.FC<NavBarProps> = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleRandom = () => {
    const min = 1;
    const max = 826;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const characterRep = props.characters.find((char) => char.id === randomNumber);

    if (characterRep) { return handleRandom(); }

    props.onSearch(randomNumber);
  };

  const toggleMenu = () => { setIsMenuOpen(!isMenuOpen); };

  return (
    <div className="bg-transparent flex p-6 top-0 w-full fixed z-50">
      {/* Menú de escritorio */}
      <div className="hidden lg:flex items-center justify-between w-full">
        <div className="flex">
          <Link to="/about" className="min-w-[80px] my-0 mx-2 p-3.5 border-4 border-colorBorderForm rounded-xl no-underline text-white font-bold text-2xl cursor-pointer hover:border-white hover:scale-105 transition-transform duration-200 ease-in-out">
            About
          </Link>
          <Link to="/home" className="min-w-[80px] my-0 mx-2 p-3.5 border-4 border-colorBorderForm rounded-xl no-underline text-white font-bold text-2xl cursor-pointer hover:border-white hover:scale-105 transition-transform duration-200 ease-in-out">
            Home
          </Link>
          <button onClick={props.handleLogout} className="min-w-[80px] my-0 mx-2 p-3.5 border-4 border-colorBorderForm rounded-xl no-underline text-white font-bold text-2xl cursor-pointer hover:border-white hover:scale-105 transition-transform duration-200 ease-in-out">
            Logout
          </button>
        </div>
        <SearchBar onSearch={props.onSearch} />
        <div className="flex">
          <button onClick={handleRandom} className="min-w-[80px] my-0 mx-2 p-3.5 bg-colorButtonLogin border-4 border-black border-solid rounded-xl no-underline text-black font-bold text-2xl cursor-pointer hover:bg-colorBorderForm hover:scale-105 transition-transform duration-200 ease-in-out">
            Random
          </button>
          <Link to="/favorites" className="min-w-[80px] my-0 mx-2 p-3.5 bg-colorButtonLogin border-4 border-black border-solid rounded-xl no-underline text-black font-bold text-2xl cursor-pointer hover:bg-colorBorderForm hover:scale-105 transition-transform duration-200 ease-in-out">
            Favorites
          </Link>
        </div>
      </div>

      {/* Botón del menú hamburguesa para móviles */}
      <button onClick={toggleMenu} className="lg:hidden text-white focus:outline-none">
        <Menu className="w-16 h-16 px-1 text-black rounded-2xl border-[4px] border-black bg-colorButtonLogin "/>
      </button>

      {/* Menú lateral para móviles */}
      <div className="lg:hidden w-[90%] mx-auto"><SearchBar onSearch={props.onSearch}/></div>
      <div className={`fixed inset-0 w-3/4 bg-colorButtonLogin border-r-2 border-black text-black transform ${ isMenuOpen ? "translate-x-0" : "-translate-x-full" } transition-transform duration-300 ease-in-out lg:hidden z-50`}>
        <div className="flex items-center justify-between p-5">
          <button onClick={toggleMenu} className="text-black">
            <X className="w-7 h-7 md:w-9 md:h-9"/>
          </button>
        </div>
        <nav className="flex flex-col p-5 space-y-4">
          <Link to="/about" className="text-xl font-semibold" onClick={toggleMenu}>
            About
          </Link>
          <Link to="/home" className="text-xl font-semibold" onClick={toggleMenu}>
            Home
          </Link>
          <button onClick={() => { props.handleLogout(); toggleMenu(); }} className="text-xl font-semibold">
            Logout
          </button>
          <Link to="/favorites" className="text-xl font-semibold" onClick={toggleMenu}>
            Favorites
          </Link>
          <button onClick={() => { handleRandom(); toggleMenu(); }} className="text-xl font-semibold">
            Random
          </button>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;