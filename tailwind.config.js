/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'font1': ['Raleway', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}

