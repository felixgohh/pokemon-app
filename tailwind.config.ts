import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        light: {
          header: '#FFF700',
          main: '#E6E6FA',
          footer: '#AFEEEE',
        },
        dark: {
          header: '#FFD700',
          main: '#191970',
          footer: '#008080',
        },
      },
      boxShadow: {
        thick: '4px 4px 0px 0px #000',
      },
    },
  },
  darkMode: 'media',
  plugins: [],
};
export default config;
