import { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{tsx,ts}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1280px',
    },
    extend: {
      gridTemplateColumns: {
        list: 'repeat(auto-fit, minmax(256px, 1fr))',
      },

      fontSize: {
        xxs: '0.625rem',
      },
      colors: {
        yellow: {
          700: '#C47F17',
          500: '#DBAC2C',
          100: '#F1E9C9',
        },
        purple: {
          700: '#4B2995',
          500: '#8047F8',
          100: '#EBE5F9',
        },
        brown: {
          900: '#272221',
          700: '#403937',
          500: '#574F4D',
          400: '#8D8686',
          100: '#D7D5D5',
        },
        white: {
          400: '#E6E5E5',
          300: '#EDEDED',
          200: '#F3F2F2',
          100: '#FAFAFA',
          50: '#FFFFFF',
        },
      },

      backgroundImage: {
        intro: "url('/BackgroundIntro.svg')",
      },

      fontFamily: {
        primary: ['"Roboto"', 'sans-serif'],
        secondary: ['"Baloo 2"', 'serif'],
      },

      lineHeight: {
        '4': '1.3rem',
        '6.5': '1.625rem',
        '13': '4rem',
      },
    },
  },
  plugins: [],
}

export default config
