module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  daisyui: {
    themes: [
      { corporate: { ...require('daisyui/src/theming/themes').corporate, primary: '#3f558a', 'base-100': '#f4f6fb' } },
      { black: { ...require('daisyui/src/theming/themes').black, primary: '#9fb1ed', 'base-100': '#151b2c' } },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
