module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    textColor: {
      'primary': '#ffa600',
      'secondary': '#000'
    },
    backgroundColor: {
      'primary': '#ffa600',
      'secondary': '#000'
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
