/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ajusta según la ubicación de tus archivos
    "./public/index.html", // Asegúrate de incluir el archivo HTML si es necesario
  ],
  theme: {
    extend: {
      colors: {
        colorBorderForm: "#adff2f",
        colorButtonLogin: "#ffa500",
        colorButtonCancel: "#d2691e",
        colorButtonFavorite: "#0fbf0f",
        colorButtonTitle: "#9acd32",
        colorWhite: "#fff",
        colorBlack: "#000",
        customDarkBlue: "rgb(25, 38, 63)",
      },
    },
  },
  plugins: [
    require("tailwindcss-textshadow"), // Asegúrate de que este plugin esté instalado
  ],
};
