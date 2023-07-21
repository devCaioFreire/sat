/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        background: "#121214",
        backgroundSecundary: "#1e1e1e",
        backgroundFields: "#323238",
        block: "#32323850",
        text: "#ffffff",
      },
      borderColor: {
        border: "#8d8d99",
      },
      gridTemplateRows: {
        default: "10rem 20rem 6rem 1fr",
      },
      gridTemplateColumns: {
        half: "5rem 5rem 5rem 5rem 4fr",
      },
    },
    screens: {
      tablet: "1280px",
      // => @media (min-width: 768px)

      default: "1366px",
      // => @media (min-width: 1366px)

      lg: "1920px",
      // => @media (min-width: 1920px)
    }
  },
  plugins: [require("tailwind-scrollbar")],
};

