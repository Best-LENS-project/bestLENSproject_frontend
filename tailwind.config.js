module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{html,js}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'hacker-color': {
          200: '#193E47',
        },
        'hacker-accent': {
          200: '#51D6CA',
          400: '#239389',
          600: '#155852',
        },
      },
    },
  },
  plugins: [require('tw-elements/dist/plugin')],
}
