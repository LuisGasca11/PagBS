/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
  'h-[50px]',
  'h-[60px]',
  'h-[80px]',
],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        border: "var(--border)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        "color-1": "#ffffff",
        "color-2": "#ff00aa",
        "color-3": "#00eaff",
        "color-4": "#ffd600",
      },
    },
  },
  plugins: [],
};
