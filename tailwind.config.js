/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './home/**/*.{html,js}',
    './panel/**/*.{html,js}'
  ],
  theme: {
    extend: {
      colors: {
        'dark-grey': '#161A1D',
        'grey': '#686c70',
        'red': '#cc0000',
        'blue': '#4C96EA',
        'lightblue': '#76B4E3',
        'gold': '#E3B05F',
      },
      spacing: {
        '1/50': '2%',
        '1/20': '5%',
        '1/10': '10%',
        '3/20': '15%',
      },
    },
  },
  plugins: [],
}