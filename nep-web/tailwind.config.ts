import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'card': '0 4px 24px -4px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 12px 40px -8px rgba(37, 99, 235, 0.15)',
        'elevated': '0 20px 60px -12px rgba(0, 0, 0, 0.08)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #dbeafe 100%)',
        'cta-gradient': 'linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)',
        'card-gradient': 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
