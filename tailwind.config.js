module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    textColor: {
      'primary': '#ffa600',
      'secondary': '#000',
      'white': '#f5f5f5',
    },
    backgroundColor: {
      'primary': '#ffa600',
      'secondary': '#000',
      'grey': '#2E2D2D'
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
