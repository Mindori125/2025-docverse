/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './pages/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          SBAggroB: ['SBAggroB', 'sans-serif'],
          KakaoBig: ['KakaoBigSans-ExtraBold', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
  