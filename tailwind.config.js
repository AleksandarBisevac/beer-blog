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
      keyframes: {
        wavey: {
          "0%, 100%": {
            transform: "scaleY(0.5)",
          },
          "50%": {
            transform: "scaleY(1.5)",
          },
        },
      },
      animation: {
        wavey: "wavey 1000ms linear infinite",
      },
    },
    backgroundImage: {
      "png-pattern": "url('/img/empty-bg.jpg')",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
