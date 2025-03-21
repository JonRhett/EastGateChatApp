/**
 * EastGate Church App Theme Configuration
 * This file defines the core design system including colors, typography, spacing, and animations
 */

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Theme = {
  colors: {
    primary: {
      main: '#2C3E50', // Deep blue-gray - represents stability and trust
      light: '#34495E',
      dark: '#1A252F',
    },
    secondary: {
      main: '#C0392B', // Deep red - represents warmth and community
      light: '#E74C3C',
      dark: '#922B21',
    },
    accent: {
      main: '#D4AF37', // Gold - represents reverence and tradition
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
    error: '#E74C3C',
    success: '#2ECC71',
    warning: '#F1C40F',
    info: '#3498DB',
  },

  typography: {
    fonts: {
      primary: 'Playfair Display', // Elegant serif for headings
      secondary: 'Inter', // Clean sans-serif for body text
      accent: 'Montserrat', // Modern sans-serif for accents
    },
    sizes: {
      h1: 32,
      h2: 24,
      h3: 20,
      body: 16,
      caption: 14,
    },
    weights: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    round: 9999,
  },

  shadows: {
    light: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 6,
    },
    dark: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 12,
    },
  },

  layout: {
    screenWidth: width,
    screenHeight: height,
    maxWidth: 1200,
    headerHeight: 60,
    bottomTabHeight: 60,
  },

  animation: {
    duration: {
      fast: 200,
      normal: 300,
      slow: 500,
    },
    easing: {
      easeInOut: 'ease-in-out',
      easeOut: 'ease-out',
      easeIn: 'ease-in',
      linear: 'linear',
    },
  },
} as const;

// Type definitions for theme usage
export type ThemeColors = typeof Theme.colors;
export type ThemeTypography = typeof Theme.typography;
export type ThemeSpacing = typeof Theme.spacing;
export type ThemeBorderRadius = typeof Theme.borderRadius;
export type ThemeShadows = typeof Theme.shadows;
export type ThemeLayout = typeof Theme.layout;
export type ThemeAnimation = typeof Theme.animation; 