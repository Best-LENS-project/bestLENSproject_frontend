module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'hacker-color': {
          200: '#1E3F20',
        },
        'hacker-accent': {
          200: '#94ECBE',
          400: '#1B9D57',
        },
      },
    },
  },
  plugins: [],
}
