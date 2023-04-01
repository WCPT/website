const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: defaultTheme.screens.sm,
      md: defaultTheme.screens.md,
      lmd: "875px",
      lg: defaultTheme.screens.lg,
      xl: defaultTheme.screens.xl,
      "2xl": defaultTheme.screens["2xl"],
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
      },

      colors: {
        skin: {
          primary: "var(--color-primary)",
          "primary-muted": "var(--color-primary-muted)",
          accent: "var(--color-accent)",
        },
      },

      textColor: {
        skin: {
          strong: "var(--color-text-strong)",
          base: "var(--color-text-base)",
          muted: "var(--color-text-muted)",
          inverted: "var(--color-text-inverted)",
          "inverted-muted": "var(--color-text-inverted-muted)",

          twitter: "var(--color-twitter)",
          youtube: "var(--color-youtube)",
          facebook: "var(--color-facebook)",
          email: "var(--color-email)",

          "twitter-hover": "var(--color-twitter-hover)",
          "youtube-hover": "var(--color-youtube-hover)",
          "facebook-hover": "var(--color-facebook-hover)",
          "email-hover": "var(--color-email-hover)",
        },
      },

      backgroundColor: {
        skin: {
          base: "var(--color-bg-base)",
          muted: "var(--color-bg-muted)",
          inverted: "var(--color-bg-inverted)",
          secondary: "var(--color-bg-secondary)",

          twitter: "var(--color-twitter-bg)",
          youtube: "var(--color-youtube-bg)",
          facebook: "var(--color-facebook-bg)",
          email: "var(--color-email-bg)",

          "twitter-hover": "var(--color-twitter-bg-hover)",
          "youtube-hover": "var(--color-youtube-bg-hover)",
          "facebook-hover": "var(--color-facebook-bg-hover)",
          "email-hover": "var(--color-email-bg-hover)",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
