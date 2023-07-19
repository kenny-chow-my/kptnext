module.exports = {
  content: ['./src/**/*.{js,ts,,jsx,tsx,css}'],
  theme: {
    extend: {
      fontFamily: { // add new font family
        montserrat: ['Montserrat', 'sans-serif']
      }
    },
  },
  corePlugins: {
    preflight: false,
  },
  darkMode: ['class'],
  plugins: [],
}

