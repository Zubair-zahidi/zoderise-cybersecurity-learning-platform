/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0f0f12',
        secondary: '#1a1a1f',
        surface: '#25252c',
        accent: '#00a8cc',
        success: '#2d6a4f',
        warning: '#e9c46a',
        danger: '#e63946',
        text: '#f1f5f9',
        muted: '#94a3b8',
        border: '#2d2d35',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        panel: '0 24px 80px rgba(0, 0, 0, 0.18)',
      },
    },
  },
  plugins: [],
}