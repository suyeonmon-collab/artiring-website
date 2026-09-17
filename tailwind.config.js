/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E8341A',
        'primary-light': '#FEF0EC',
        'secondary-yellow': '#FFD43B',
        'secondary-yellow-light': '#FFFBEB',
        'secondary-blue': '#3B82F6',
        'secondary-blue-light': '#EFF6FF',
        gray: {
          900: '#1A1A1A',
          700: '#4A4A4A',
          500: '#888888',
          300: '#CCCCCC',
          100: '#F5F5F5',
        },
        point: 'var(--color-primary)',
        bg: 'var(--color-bg)',
        'bg-sub': 'var(--color-bg-sub)',
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        accent: ['Cafe24Ssurround', 'Pretendard', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
      borderRadius: {
        cta: '14px',
      },
    },
  },
  plugins: [],
};
