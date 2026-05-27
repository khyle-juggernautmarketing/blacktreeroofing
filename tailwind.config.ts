import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#48D1CC', dark: '#3ab8b3', light: 'rgba(72, 209, 204, 0.15)' },
      },
      fontFamily: { sans: ['var(--font-inter)', 'system-ui', 'sans-serif'] },
      boxShadow: {
        card: '0 4px 24px -4px rgba(15, 23, 42, 0.08)',
        'card-lg': '0 12px 40px -12px rgba(15, 23, 42, 0.15)',
        glass: '0 8px 32px 0 rgba(148, 163, 184, 0.08)',
        'glass-lg': '0 12px 48px -8px rgba(148, 163, 184, 0.12)',
      },
      transitionDuration: {
        600: '600ms',
      },
    },
  },
  plugins: [],
}
export default config
