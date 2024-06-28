/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "background": "#1c1c1c",
        "backgroundsecondary": "#212121",
        "foreground": "#eaebdb",
        "primary": "#3fcf8e",
      },
      screens: {
        'sm': '576px',
        'md': '768px',
        'lg': '992px',
        'xl': '1200px',
        '2xl': '1366px',
        '3xl': '1600px',
      },
    },
  },
  plugins: [],
};
