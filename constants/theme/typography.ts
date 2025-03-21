/**
 * Typography configuration for the EastGate Church app
 * Defines font families, sizes, and line heights for consistent text styling
 */

export const typography = {
  // Font Families
  fontFamily: {
    primary: 'PlayfairDisplay',
    secondary: 'Inter',
    accent: 'Montserrat',
  },

  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 24,
    '2xl': 32,
    '3xl': 48,
    '4xl': 64,
  },

  // Line Heights
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Font Weights
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Text Styles
  textStyles: {
    h1: {
      fontFamily: 'PlayfairDisplay',
      fontSize: 48,
      fontWeight: '700',
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: 'PlayfairDisplay',
      fontSize: 32,
      fontWeight: '600',
      lineHeight: 1.3,
    },
    h3: {
      fontFamily: 'PlayfairDisplay',
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 1.4,
    },
    body: {
      fontFamily: 'Inter',
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 1.5,
    },
    caption: {
      fontFamily: 'Inter',
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 1.5,
    },
    button: {
      fontFamily: 'Inter',
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 1.5,
    },
  },
}; 