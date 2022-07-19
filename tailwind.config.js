const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  important: true,
  content: ["./src/**/*.{html,ts,css}"],
  theme: {
    extend: {
      fontFamily: {
        sans: `"Inter var", ${defaultTheme.fontFamily.sans.join(",")}`,
      },
    },
  },
  plugins: [],
};
