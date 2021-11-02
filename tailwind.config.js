module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      margin: {
      'custom': '36rem',
    }
    },
    flex: {
      '3': '1 0 33%',
      '4': '0.9 0 25%',
    },
    fontFamily: {
      'custom': ['Signika Negative'],
    },
    
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
