/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      sm:    '640px',
      md:    '768px',
      lg:    '1024px',
      xl:    '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px',
      '5xl': '3840px',
    },
    extend: {
      colors: {
        // Brand palette
        navy: {
          DEFAULT: '#08213C',
          50: '#eef3f8',
          100: '#d3deea',
          200: '#9fb6cf',
          300: '#6b8db3',
          400: '#3d6390',
          500: '#1f4267',
          600: '#123150',
          700: '#0c2942',
          800: '#08213C',
          900: '#051628',
          950: '#030e1a',
        },
        emerald: {
          DEFAULT: '#3CB98C',
          50: '#ecfaf4',
          100: '#d0f3e4',
          200: '#a4e7cd',
          300: '#6fd5b0',
          400: '#3CB98C',
          500: '#2c9d74',
          600: '#1f7e5e',
          700: '#1b654d',
          800: '#19503f',
          900: '#164235',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Fluid overrides for Tailwind's default scale — every text-* size now
        // scales continuously with viewport width (clamp), so no manual
        // breakpoint variants are needed for font size.
        xs:   ['clamp(0.75rem, 0.7vw, 0.8125rem)',  { lineHeight: '1.4' }],
        sm:   ['clamp(0.875rem, 0.9vw, 1rem)',      { lineHeight: '1.45' }],
        base: ['clamp(1rem, 1vw, 1.125rem)',        { lineHeight: '1.5' }],
        lg:   ['clamp(1.125rem, 1.1vw, 1.3125rem)', { lineHeight: '1.5' }],
        xl:   ['clamp(1.25rem, 1.3vw, 1.5rem)',     { lineHeight: '1.4' }],
        '2xl': ['clamp(1.5rem, 1.6vw, 1.875rem)',   { lineHeight: '1.3' }],
        '3xl': ['clamp(1.875rem, 2vw, 2.375rem)',   { lineHeight: '1.2' }],
        '4xl': ['clamp(2.25rem, 2.4vw, 2.875rem)',  { lineHeight: '1.15' }],
        // Heading scale per CLAUDE.md — responsive around 20px across all heading roles
        'display-wordmark': ['clamp(1.875rem, 2.4vw, 2.375rem)', { lineHeight: '1.2', letterSpacing: '-0.04em', fontWeight: '900' }],
        'hero-h1': ['clamp(1.875rem, 2.4vw, 2.375rem)', { lineHeight: '1.2', letterSpacing: '-0.04em', fontWeight: '900' }],
        'section-h2': ['clamp(1.875rem, 2.4vw, 2.375rem)', { lineHeight: '1.2', letterSpacing: '-0.04em', fontWeight: '900' }],
        'sub-heading': ['clamp(1.875rem, 2.4vw, 2.375rem)', { lineHeight: '1.2', letterSpacing: '-0.04em', fontWeight: '900' }],
        'card-heading': ['clamp(1.875rem, 2.4vw, 2.375rem)', { lineHeight: '1.2', letterSpacing: '-0.04em', fontWeight: '900' }],
        // Non-heading fluid scale (unchanged)
        'body-fluid': ['clamp(0.875rem, 1.25vw, 1.125rem)', { lineHeight: '1.8' }],
        'meta-value': ['clamp(0.9375rem, 1.2vw, 1.25rem)', { lineHeight: '1.3' }],
        'eyebrow-fluid': ['clamp(0.625rem, 0.8vw, 0.8125rem)', { lineHeight: '1.3', letterSpacing: '0.22em', fontWeight: '800' }],
        // Legacy aliases kept for compatibility — now mapped onto the heading scale
        'display-xl': ['clamp(1.875rem, 2.4vw, 2.375rem)', { lineHeight: '1.2', letterSpacing: '-0.04em', fontWeight: '900' }],
        'display-lg': ['clamp(1.875rem, 2.4vw, 2.375rem)', { lineHeight: '1.2', letterSpacing: '-0.04em', fontWeight: '900' }],
        'display-md': ['clamp(1.875rem, 2.4vw, 2.375rem)', { lineHeight: '1.2', letterSpacing: '-0.04em', fontWeight: '900' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        glass: '0 8px 32px -8px rgba(8, 33, 60, 0.12), 0 2px 8px -2px rgba(8, 33, 60, 0.08)',
        'glass-lg': '0 24px 64px -16px rgba(8, 33, 60, 0.20), 0 8px 24px -8px rgba(8, 33, 60, 0.12)',
        'premium': '0 20px 50px -12px rgba(8, 33, 60, 0.25)',
        'glow-emerald': '0 0 0 1px rgba(60, 185, 140, 0.2), 0 12px 40px -8px rgba(60, 185, 140, 0.35)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.6)',
      },
      backgroundImage: {
        'mesh-light':
          'radial-gradient(at 18% 12%, rgba(8,33,60,0.04) 0px, transparent 50%), radial-gradient(at 82% 8%, rgba(8,33,60,0.05) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(8,33,60,0.03) 0px, transparent 55%)',
        'mesh-dark':
          'radial-gradient(at 12% 18%, rgba(60,185,140,0.22) 0px, transparent 45%), radial-gradient(at 88% 12%, rgba(31,66,103,0.55) 0px, transparent 50%), radial-gradient(at 60% 95%, rgba(60,185,140,0.16) 0px, transparent 50%)',
        'grid-faint':
          'linear-gradient(to right, rgba(8,33,60,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(8,33,60,0.045) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-32': '32px 32px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.9' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        marquee: 'marquee 32s linear infinite',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
