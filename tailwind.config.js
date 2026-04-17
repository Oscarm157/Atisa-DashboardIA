/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        atisa: {
          red: "#D2262C",
          redDark: "#A51E23",
          redLight: "#F04A50",
          black: "#1A1A1A",
          gray: "#F5F5F5",
          grayDark: "#6B6B6B",
          grayMid: "#D4D4D4",
        },
      },
      fontFamily: {
        sans: [
          "Segoe UI",
          "Tahoma",
          "Geneva",
          "Verdana",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px 0 rgba(0,0,0,0.04)",
        cardHover: "0 4px 14px 0 rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
