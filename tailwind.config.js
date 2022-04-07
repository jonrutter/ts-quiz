const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Catamaran', ...defaultTheme.fontFamily.sans],
        heading: ['"Fascinate Inline"'],
      },
    },
  },
  plugins: [],
};
