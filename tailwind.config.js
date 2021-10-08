module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    flex: {
      '3': '1 0 33%',
      '4': '1 0 25%',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
