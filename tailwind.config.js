/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#2C3E50',
          light: '#34495E',
          dark: '#1A252F',
        },
        secondary: {
          main: '#C0392B',
          light: '#E74C3C',
          dark: '#922B21',
        },
        accent: {
          main: '#D4AF37',
          light: '#F1C40F',
          dark: '#B7950B',
        },
        background: {
          light: '#F5F6FA',
          dark: '#1A1A1A',
        },
        text: {
          light: '#2C3E50',
          dark: '#ECF0F1',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#2D2D2D',
        },
      },
      fontFamily: {
        primary: ['Playfair Display'],
        secondary: ['Inter'],
        accent: ['Montserrat'],
      },
      fontSize: {
        h1: '32px',
        h2: '24px',
        h3: '20px',
        body: '16px',
        caption: '14px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
        round: '9999px',
      },
      boxShadow: {
        light: '0 2px 3px rgba(0, 0, 0, 0.1)',
        medium: '0 4px 6px rgba(0, 0, 0, 0.15)',
        dark: '0 8px 12px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
} 