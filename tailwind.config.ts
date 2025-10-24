import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{mdx,md}',
    './lib/**/*.{ts,tsx}',
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg)',
        foreground: 'var(--fg)',
        muted: 'var(--muted)',
        brand: {
          300: 'var(--brand-300)',
          500: 'var(--brand-500)',
          700: 'var(--brand-700)',
          900: 'var(--brand-900)',
        },
        accent: {
          1: 'var(--accent-1)',
          2: 'var(--accent-2)',
        },
        card: 'var(--card)',
        border: 'rgba(148, 163, 184, 0.2)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        display: ['var(--font-display)', ...fontFamily.sans],
      },
      borderRadius: {
        '2xl': '1.25rem',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
      },
      boxShadow: {
        soft: '0 20px 40px -20px rgba(37, 99, 235, 0.35)',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};

export default config;
