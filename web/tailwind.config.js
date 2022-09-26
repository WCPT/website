const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '540px',
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        serif: ['Bitter', 'serif'],
        mono: ['Cousine'],
      },
      textColor: {
        nav: {
          base: 'var(--color-text-base)',
        }
      },
      backgroundColor: {
        nav: {
          fill: 'var(--color-fill)',
        }
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
