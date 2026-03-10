/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          deep: '#0B231A',
          darker: '#1b3a2f',
          dark: '#224236',
          DEFAULT: '#2D5444',
          soft: '#f1f5f3',
          light: '#3e6b5a',
        },
        bg: {
          dark: '#ffffff',
        },
        gray: '#ffffff',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}