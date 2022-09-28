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

      colors: {
        skin: {
          primary: "var(--color-primary)",
          accent: "var(--color-accent)",
        },
      },

      textColor: {
        skin: {
          base: "var(--color-base-text)",
          muted: "var(--color-muted-text)",
          inverted: "var(--color-inverted-text)",
          "inverted-muted": "var(--color-inverted-muted-text)",

          twitter: "var(--color-twitter)",
          youtube: "var(--color-youtube)",
          facebook: "var(--color-facebook)",
          email: "var(--color-email)",

          "twitter-hover": "var(--color-twitter-hover)",
          "youtube-hover": "var(--color-youtube-hover)",
          "facebook-hover": "var(--color-facebook-hover)",
          "email-hover": "var(--color-email-hover)",

          nav: {
            base: "var(--color-nav-text-base)",
          },
        },
      },

      backgroundColor: {
        skin: {
          base: "var(--color-base-bg)",
          secondary: "var(--color-secondary-bg)",

          twitter: "var(--color-twitter-bg)",
          youtube: "var(--color-youtube-bg)",
          facebook: "var(--color-facebook-bg)",
          email: "var(--color-email-bg)",

          "twitter-hover": "var(--color-twitter-bg-hover)",
          "youtube-hover": "var(--color-youtube-bg-hover)",
          "facebook-hover": "var(--color-facebook-bg-hover)",
          "email-hover": "var(--color-email-bg-hover)",

          nav: {
            fill: "var(--color-nav-fill)",
          },
        },
      },

      borderColor: {
        skin: {
          base: "var(--color-base-border)",
          muted: "var(--color-muted-border)",
          inverted: "var(--color-inverted-border)",
          "inverted-muted": "var(--color-inverted-muted-border)",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
