import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Ink scale - deep navy for text/backgrounds
        ink: {
          50: '#f0f2f5',
          100: '#dce1e8',
          200: '#b8c3d1',
          300: '#94a5ba',
          400: '#7087a3',
          500: '#4c698c',
          600: '#3d5470',
          700: '#2e3f54',
          800: '#1f2a38',
          900: '#141c26',
          950: '#0a0e14',
        },
        // Warm off-white for light sections
        paper: {
          warm: '#faf9f7',
          DEFAULT: '#faf9f7',
        },
        // Category colors
        category: {
          democracy: '#3b82f6',
          civil: '#a855f7',
          labor: '#f97316',
        },
        // Risk badge backgrounds (dark)
        risk: {
          green: {
            bg: '#022c22',
            text: '#4ade80',
            glow: 'rgba(74, 222, 128, 0.3)',
          },
          yellow: {
            bg: '#451a03',
            text: '#fbbf24',
            glow: 'rgba(251, 191, 36, 0.3)',
          },
          red: {
            bg: '#450a0a',
            text: '#f87171',
            glow: 'rgba(248, 113, 113, 0.3)',
          },
        },
      },
      fontFamily: {
        serif: ['var(--font-instrument-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(74, 222, 128, 0.3)',
        'glow-yellow': '0 0 20px rgba(251, 191, 36, 0.3)',
        'glow-red': '0 0 20px rgba(248, 113, 113, 0.3)',
        'glow-white': '0 0 40px rgba(255, 255, 255, 0.1)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px currentColor' },
          '100%': { boxShadow: '0 0 20px currentColor, 0 0 30px currentColor' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-gradient': 'radial-gradient(at 40% 20%, hsla(218, 70%, 20%, 1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(250, 70%, 25%, 0.8) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(200, 60%, 15%, 1) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(280, 50%, 20%, 0.6) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(220, 70%, 15%, 1) 0px, transparent 50%)',
      },
    },
  },
  plugins: [],
};
export default config;
