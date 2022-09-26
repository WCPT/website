const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "500px",
      sm: defaultTheme.screens.sm,
      md: defaultTheme.screens.md,
      lmd: "875px",
      lg: defaultTheme.screens.lg,
      xl: defaultTheme.screens.xl,
      "2xl": defaultTheme.screens["2xl"],
    },
    extend: {
      fontFamily: {
        sans: ["Lato", "sans-serif"],
        serif: ["Bitter", "serif"],
        mono: ["Cousine"],
      },
      textColor: {
        nav: {
          base: "var(--color-nav-text-base)",
        },
      },
      backgroundColor: {
        nav: {
          fill: "var(--color-nav-fill)",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
