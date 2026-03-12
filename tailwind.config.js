/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
      },
      colors: {
        mindbloom: {
          bg: '#F8F5FF',
          surface: '#FFFFFF',
          surface2: '#F0EBFF',
          primary: '#7C3AED',
          'primary-light': '#A78BFA',
          accent: '#60A5FA',
          accent2: '#C4B5FD',
          text: '#1E1B4B',
          muted: '#6B7280',
          border: '#E5E7EB',
          // Cyberpunk dark
          'dark-bg': '#0A0A0F',
          'dark-surface': '#0F0F1A',
          'dark-surface2': '#141428',
          neon: '#B026FF',
          'neon-green': '#00FF9F',
          'neon-orange': '#FF6B00',
          'dark-text': '#E8E8FF',
          'dark-muted': '#8888AA',
        },
      },
      animation: {
        'gradient-shift': 'gradientShift 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease forwards',
        'score-fill': 'scoreFill 1.5s ease-out forwards',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseNeon: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 10px #B026FF, 0 0 20px #B026FF' },
          '50%': { opacity: '0.7', boxShadow: '0 0 20px #B026FF, 0 0 40px #B026FF, 0 0 60px #B026FF' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 5px #00FF9F, 0 0 10px #00FF9F' },
          '50%': { boxShadow: '0 0 15px #00FF9F, 0 0 30px #00FF9F, 0 0 45px #00FF9F' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scoreFill: {
          from: { strokeDashoffset: '440' },
          to: { strokeDashoffset: 'var(--score-offset)' },
        },
      },
      boxShadow: {
        'neon-purple': '0 0 10px #B026FF, 0 0 20px #B026FF',
        'neon-green': '0 0 10px #00FF9F, 0 0 20px #00FF9F',
        'neon-orange': '0 0 10px #FF6B00, 0 0 20px #FF6B00',
        'soft-purple': '0 4px 30px rgba(124, 58, 237, 0.15)',
        'soft-blue': '0 4px 30px rgba(96, 165, 250, 0.15)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
