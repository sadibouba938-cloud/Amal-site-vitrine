import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        amal: {
          950: '#040B14',
          900: '#071324',
          800: '#0D213A',
          700: '#16355B',
          600: '#1E4C80',
          cyan: '#00E5FF',
          teal: '#00C49A',
          emerald: '#10B981',
          gold: '#F59E0B',
          amber: '#FBBF24',
          foam: '#E0F7FA',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at center, rgba(0, 229, 255, 0.16) 0%, rgba(16, 185, 129, 0.05) 45%, transparent 75%)',
      },
    },
  },
  plugins: [],
};

export default config;
