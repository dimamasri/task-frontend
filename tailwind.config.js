module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGray: '#1A1A1A',
        lightGray: '#B3B3B3',
        darkBlue: '#0D3D45',
        lightBlue: '#69D8F7',
        navyBlue: '#111928',
        extraLightBlue: "#E5E7EB",
        extraLightGray: "#F9F9F9",
        formGray: '#A9ABB2',
        formBlue: '#187180'
      },
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '2rem',
        screens: {
          sm: '100%',
          md: '720px',
          lg: '960px',
          xl: '1140px',
          '2xl': '1320px',
        },
      },
    },
  },
  plugins: [],
};