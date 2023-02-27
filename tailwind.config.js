/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./server/public/*.{html,js}', './client/*.jsx', './client/**/*.jsx'],
  theme: {
    extend: {}
  },
  variants: {
    display: ['responsive', 'group-hover', 'group-focus']
  },
  plugins: [require('@tailwindcss/aspect-ratio')]
};
