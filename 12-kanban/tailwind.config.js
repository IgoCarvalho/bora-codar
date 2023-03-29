/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Inter, sans-serif',
      },
      boxShadow: {
        smooth: '0px 4px 16px rgba(22, 22, 22, 0.1)',
        card: '0px 4px 16px #EAE2FD;',
      },
    },
  },
  plugins: [],
};
