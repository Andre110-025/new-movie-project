/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#911b1b', // Fix typo from 'color' → 'colors'
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.05)' },
        },
        bounceDelay: {
          '0%, 80%, 100%': { transform: 'scaleY(0.4)' },
          '40%': { transform: 'scaleY(1.0)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.8s ease-out',
        fadeUp: 'fadeUp 0.6s ease-out',
        pulseSlow: 'pulseSlow 2s ease-in-out infinite',
        bounceDelay: 'bounceDelay 1s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}
