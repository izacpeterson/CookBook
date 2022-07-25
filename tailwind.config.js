/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0D6EFD",
        back1: "#1a1a1a",
        back2: "#111",
      },
    },
  },
  plugins: [],
};
