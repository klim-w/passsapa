/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        emerald: {
          950: "#070d0c",
        },
      },
      fontFamily: {
        heading: ["Prompt", "sans-serif"],
        body: ["Sarabun", "sans-serif"],
      },
    },
  },
  plugins: [],
};
