import About from "./Components/About/About.tsx";
import Cards from "./Components/Cards/Cards.tsx";
import NavBar from "./Components/NavBar/NavBar.tsx";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Detail from "./Components/Detail/Detail.tsx";
import Form from "./Components/Form/Form.tsx";
import Error from "./Components/Error 404/Error.tsx";
import Favorites from "./Components/Favorites/Favorites.tsx";
import imgbg from "./assets/background.jpeg";
import { getCharacterById } from "./Services/GET/getCharacters.ts";
import { loginUser } from "./Services/GET/getUser.ts";
import { Character, UserDataApp } from "./Models/interfaces.ts";

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const { pathname } = useLocation();
  const [access, setAccess] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!access) {
      navigate("/");
    }
  }, [access, navigate]);

  const onSearch = async (id: string | number) => {
    try {
      const stringId = String(id);
      const response = await getCharacterById(stringId);
      const data = response.data;

      if (data.name) {
        const characterRep = characters.find((char) => char.id === data.id);
        if (characterRep) {
          return alert("Personaje repetido");
        }
        setCharacters((oldChars) => [...oldChars, data]);
      }
    } catch (error) {
      console.error(error); // Imprimir el error en la consola
      alert("¡No hay personajes con este ID!");
    }
  };

  const onClose = (id: number) => {
    setCharacters(characters.filter((char) => char.id !== id));
  };

  const login = async (userData: UserDataApp) => {
    try {
      const { username, password } = userData;
      const data = await loginUser(username, password);

      setAccess(data.access);

      if (data.access) {
        navigate("/home");
      }
    } catch (error) {
      console.log("Error en la solicitud: ", error);
    }
  };

  const handleLogout = () => {
    setAccess(false);
    setCharacters([]);
  };

  return (
    <div className="text-center h-screen">
      <img
        src={imgbg}
        alt="fondo"
        className="-z-10 fixed top-0 left-0 w-full h-full object-cover"
      />

      <div className="flex flex-col h-full w-full items-center justify-center overflow-y-auto">
        {pathname !== "/" && (
          <NavBar
            onSearch={onSearch}
            characters={characters}
            handleLogout={handleLogout}
          />
        )}
        <Routes>
          <Route path="*" element={<Error />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/" element={<Form login={login} />} />
          <Route
            path="/home"
            element={<Cards characters={characters} onClose={onClose} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
