const colors = require("tailwindcss/colors");
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    theme: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      colors: {
        transparent: "transparent",
        black: "#000",
        white: {
          DEFAULT: "fff",
          dark: "#f8f9fb",
        },
        gray: {
          DEFAULT: "#eaeaea",
        },
        blue: {
          DEFAULT: "007aff",
        },
        green: colors.green,
      },
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      extend: {
        spacing: {
          128: "32rem",
          144: "36rem",
        },
        // borderRadius: {
        //   "4xl": "2rem",
        // },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
