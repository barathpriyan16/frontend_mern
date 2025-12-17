module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        accent: '#06B6D4'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        slideUp: {
          '0%': { transform: 'translateY(12px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-out',
        slideUp: 'slideUp 0.5s ease-out'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
