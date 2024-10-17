import React, { useState } from "react";
import validation from "./Validations";
import { UserData, Errors, FormProps } from "../../Models/interfaces";

const Form: React.FC<FormProps> = ({ login }) => {
  // Estado para almacenar los datos del usuario
  const [userData, setUserData] = useState<UserData>({
    username: "",
    password: "",
  });

  // Estado para almacenar los errores de validación
  const [errors, setErrors] = useState<Errors>({
    username: "",
    password: "",
  });

  // Maneja el cambio de los inputs (username y password)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const property = event.target.name as keyof UserData; // El nombre del input (username o password)
    const value = event.target.value; // El valor que el usuario ha ingresado en el input

    const updatedUserData = { ...userData, [property]: value }; // Hacemos una copia de userData y actualizamos la propiedad correspondiente
    setUserData(updatedUserData); // Actualizamos el estado con los nuevos datos
    validation(updatedUserData, errors, setErrors); // Ejecutamos la validación después de actualizar el estado
  };

  // Maneja el envío del formulario
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    login(userData); // Llama a la función login pasando los datos del usuario
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col absolute z-10 justify-center border-[4px] border-colorBorderForm bg-[#00000033] rounded-2xl px-16 py-12 gap-4"
    >
      <div>
        <div className="flex items-end">
          <label className="text-colorWhite font-bold mr-2" htmlFor="username">
            Username:
          </label>
          {/* Input para el username, bindeado al estado userData */}
          <input
            className="rounded-xl h-6 px-2 py-3.5 outline-none"
            type="text"
            name="username"
            value={userData.username} // El valor viene del estado
            onChange={handleInputChange} // Llama a handleInputChange cuando el usuario escribe
          />
        </div>
        {/* Muestra el error si existe */}
        <p className="text-white">{errors.username}</p>
      </div>
      <div>
        <div className="flex items-end">
          <label className="text-colorWhite font-bold mr-2" htmlFor="password">
            Password:
          </label>
          {/* Input para la contraseña, bindeado al estado userData */}
          <input
            className="rounded-xl h-6 px-2 py-3.5 outline-none"
            type="password" // Tipo password para ocultar el texto
            name="password"
            value={userData.password} // El valor viene del estado
            onChange={handleInputChange} // Llama a handleInputChange cuando el usuario escribe
          />
        </div>
        {/* Muestra el error si existe */}
        <p className="text-colorWhite">{errors.password}</p>
      </div>
      {/* Botón de envío */}
      <button className="bg-colorButtonLogin rounded-2xl border-[4px] border-black py-2 text-2xl font-bold mt-6">
        Login
      </button>
    </form>
  );
};

export default Form;
