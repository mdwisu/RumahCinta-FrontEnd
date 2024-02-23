/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  // enable dark mode via class strategy
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        textPri: "#000000",
        textSec: "#545454",
        textOpt: "#FFFFFF",
        textFunc: "#A6A6A6",
        bgPri: "#FFFFFF",
        bgSec: "#EDEAE4",
        bgTri: "#E6E6E6",
        bgOpt: "#F2AF29",
        bgOpt2: "#FFB803",
        bgFunc: "#B8343A",
        bgFunc2: "#B8131A",
        bgFunc3: "#941F3A",
        bgFunc4: "#CF2C57",
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)",
        customPurple: {
          light: "#B78BFF",
          DEFAULT: "#7E22CE",
          dark: "#4B0082",
        },
      },
      fontSize: {
        sizePri: 28.5,
        sizeTri: 36,
        sizeParagraph: 14,
        sizeSec: 56,
      },
    },
  },
  plugins: [],
};
