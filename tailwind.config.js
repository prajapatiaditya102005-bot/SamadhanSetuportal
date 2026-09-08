/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc5fb',
          400: '#36a5f7',
          500: '#0c87eb',
          600: '#006bc8',
          700: '#0155a3',
          800: '#064986',
          900: '#0b3b60',
          950: '#072640',
        },
        jharkhand: {
          green: '#057a55',
          darkgreen: '#065f46',
          lightgreen: '#d1fae5',
          saffron: '#d97706',
          terracotta: '#c2410c',
          navy: '#0b3b60',
          sand: '#fef3c7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
