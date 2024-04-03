/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily:{
      primary: 'inter',
      poppins: 'poppins',
      euclid: 'euclid-circular-a',
      mono: ['ui-monospace', 'tSFMono-Regular'],
      mont: ['Montserrat']
    },
    colors: {
      transparent: 'transparent',
      white:'#fff',
      orange:'#EF8544',
      grey: '#EFEFF0',
      darkGrey: '#94A3B8',
      black:'#000',
      lightGreen:'#2DB667',
      red:'#C22F2F',
      lightRed:'#F00',
      darkOrange:'#E46B20',
      lighterOrange: '#EB5C03',
      lightBlue:'#2C89DF',
      successGreen:'#3E8C47',

      primary: {
        dark: '#092E37',
        light: '#0F4C5C',
        darkest: '#0E313B'
      },
    }
  },
  plugins: [],
}

