const colors = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  safelist: [
    {
      pattern:
        /(bg|text)-(primary|success|danger|warning)-(50|100|200|300|400|500|600|700|800|900)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        success: colors.green,
        danger: colors.rose,
        warning: colors.yellow,
      },
      fontFamily: {
        sans: ['Inter var', ...fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
