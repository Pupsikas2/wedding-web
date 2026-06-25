/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts}'],
  safelist: ['font-playfair'],
  theme: {
    extend: {
      colors: {
        sand: '#F3E8E1',
        wine: '#A60403',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
