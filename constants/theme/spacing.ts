/**
 * Spacing configuration for the EastGate Church app
 * Defines consistent spacing values for layout and components
 */

export const spacing = {
  // Base spacing unit (4px)
  base: 4,

  // Spacing scale
  xs: 4,    // 4px
  sm: 8,    // 8px
  md: 16,   // 16px
  lg: 24,   // 24px
  xl: 32,   // 32px
  '2xl': 48, // 48px
  '3xl': 64, // 64px
  '4xl': 96, // 96px

  // Layout spacing
  layout: {
    screen: 16,
    section: 24,
    container: 32,
    content: 16,
  },

  // Component spacing
  components: {
    button: {
      padding: 12,
      margin: 8,
    },
    input: {
      padding: 12,
      margin: 8,
    },
    card: {
      padding: 16,
      margin: 8,
    },
    list: {
      item: 12,
      section: 24,
    },
  },

  // Navigation spacing
  navigation: {
    header: 56,
    tabBar: 64,
    bottomBar: 80,
  },
}; 