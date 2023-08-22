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
        backgroundModal: "#12121490",
        backgroundSecundary: "#1e1e1e",
        backgroundFields: "#323238",
        block: "#32323850",
        text: "#ffffff",
        loginBtn: "#5A5C6A"
      },
      backgroundImage: {
        'gradient-login': 'radial-gradient(circle at 10% 20%, rgb(90, 92, 106) 0%, rgb(32, 45, 58) 81.3%)',
      },
      boxShadow: {
        'custom': '0px 0px 30px 5px rgba(0,0,0,0.75)'
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

