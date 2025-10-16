/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff8200',
          light: '#f7b84b',
          dark: '#e57400',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};