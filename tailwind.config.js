/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0c0c0c',
        'secondary': '#60a5fa',
        'accent': '#93c5fd',
        'blue': {
          500: '#151515',
        },
        'green': {
          500: '#22c55e',
        },
        'red': {
          500: '#ef4444',
        },
        'indigo': {
          500: '#6366f1',
        },
      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        slideIn: 'slideIn 0.5s ease-out',
      },
    },
  },
  plugins: [],
}