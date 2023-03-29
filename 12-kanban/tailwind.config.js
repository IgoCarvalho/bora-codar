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
      backgroundImage: {
        main: 'linear-gradient(90deg, rgba(124,58,237,1) 0%, rgba(124,58,237,1) 50%, rgba(251,250,255,1) 50%, rgba(251,250,255,1) 100%)',
      },
    },
  },
  plugins: [],
};
