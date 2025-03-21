# EastGate Chat App - Theme Documentation

This document outlines the theme system for the EastGate Chat App.

## Overview
The theme system is designed to provide a consistent and flexible design language across the application. It supports both light and dark modes, and uses a modular approach to styling.

## Theme Structure

### Colors
The color system is defined in `constants/theme/colors.ts`:
```typescript
export const colors = {
  primary: '#007AFF',
  secondary: '#5856D6',
  background: '#FFFFFF',
  text: '#000000',
  // ... other colors
};
```

### Typography
Typography styles are defined in `constants/theme/typography.ts`:
```typescript
export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  // ... other text styles
};
```

### Spacing
Spacing system is defined in `constants/theme/spacing.ts`:
```typescript
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  // ... other spacing values
};
```

### Shadows
Shadow styles are defined in `constants/theme/shadows.ts`:
```typescript
export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  // ... other shadow styles
};
```

## Theme Context
The theme context (`contexts/ThemeContext.tsx`) provides:
- Theme state management
- Theme switching functionality
- Theme-aware components

## Usage

### In Components
```typescript
import { useTheme } from '../contexts/ThemeContext';

const MyComponent = () => {
  const { colors, typography, spacing } = useTheme();
  
  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={typography.h1}>Hello World</Text>
    </View>
  );
};
```

### Custom Hooks
The theme system provides several custom hooks:
- `useColorScheme()` - Get current color scheme
- `useThemeColor()` - Get themed color values
- `useThemeStyles()` - Get themed style objects

## Best Practices
1. Always use theme values instead of hardcoded styles
2. Use the provided hooks for theme access
3. Keep component styles consistent with the theme system
4. Test components in both light and dark modes
5. Use semantic color names (e.g., `primary` instead of `#007AFF`)

## Future Enhancements
1. Add animation system
2. Implement responsive design system
3. Add accessibility features
4. Create component library documentation
5. Add theme preview tools 