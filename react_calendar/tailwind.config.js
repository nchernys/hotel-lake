/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "2xl": "1400px",
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 1)",
      },
      borderWidth: {
        1: "1px",
      },
      width: {
        "30%": "30%",
        "46%": "46%",
      },
      height: {
        "20%": "20%",
        lobby: "calc(100vh/1.8)",
      },
      spacing: {
        "b-20%": "0 0 20% 0",
        "b-30%": "0 0 30% 0",
        "b-10%": "0 0 10% 0",
        "b-70%": "0 0 70% 0",
        "t-10%": "25% 0 0 0",
      },
      translate: {
        "10%": "17%",
      },
      scale: {
        175: "1.75",
        200: "2",
        250: "2.5",
        300: "3",
      },

      keyframes: {
        expandBtn: {
          "0%": {
            transform: "translate(100%, -25%) scale(0)",
            opacity: "0.2",
          },
          "100%": {
            transform: "translate(100%, -25%) scale(3)",
            opacity: "0",
          },
        },
      },
      animation: {
        expandBtn: "expandBtn 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
