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
        bg: 'var(--color-bg)',
        'bg-sub': 'var(--color-bg-sub)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        point: 'var(--color-point)',
      },
      fontFamily: {
        sans: ['Pretendard', '나눔고딕', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'content': '840px',
      },
      fontSize: {
        'body': ['16px', { lineHeight: '1.7', letterSpacing: '-0.01em' }],
      },
    },
  },
  plugins: [],
};




