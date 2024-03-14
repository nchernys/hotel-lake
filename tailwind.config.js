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
      width: {
        "30%": "30%",
        "46%": "46%",
      },
      height: {
        "20%": "20%",
      },
      spacing: {
        "b-20%": "0 0 20% 0",
        "b-30%": "0 0 30% 0",
        "b-10%": "0 0 10% 0",
        "b-70%": "0 0 70% 0",
      },
      translate: {
        "10%": "17%",
      },
    },
  },
  plugins: [],
};
