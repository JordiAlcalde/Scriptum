/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['Lora', 'Merriweather', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Cinzel', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        paper: {
          light: '#FBF9F5',
          card: '#FFFFFF',
          border: '#E8E3D9',
          text: '#2C2523',
          muted: '#7A6F68',
        },
        sepia: {
          bg: '#F4ECD8',
          card: '#EFE5CE',
          border: '#DDCFB2',
          text: '#433422',
          muted: '#806F57',
        },
        nocturn: {
          bg: '#141414',
          card: '#1F1F1F',
          border: '#2E2E2E',
          text: '#E6E4DE',
          muted: '#9E9C96',
        }
      }
    },
  },
  plugins: [],
};

