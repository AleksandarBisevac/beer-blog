/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: "var(--neutral)",
        onNeutral: "var(--onNeutralBg)",
        primary: "var(--primary)",
        onPrimaryBg: "var(--onPrimaryBg)",
        primaryBg: "var(--primaryBg)",
        secondaryBg: "var(--secondaryBg)",
      },
      transitionProperty: {
        width: "width",
      },
    },
    backgroundImage: {
      "png-pattern": "url('/img/empty-bg.jpg')",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
