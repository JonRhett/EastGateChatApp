# EastGate Church Communication Hub - Theme System Documentation

This document provides a comprehensive guide on how to use the theme system in the EastGate Church Communication Hub application.

## Overview

Our theme system is built on a centralized configuration that provides consistent styling across the entire application. It supports both light and dark modes, and includes predefined styles for common UI elements.

## Theme Structure

### 1. Theme Configuration (`constants/theme/index.ts`)

The theme configuration contains all the design tokens used throughout the application:

```typescript
// Example theme structure
{
  colors: {
    primary: {
      main: '#2C3E50',
      light: '#34495E',
      dark: '#1A252F'
    },
    // ... other color definitions
  },
  typography: {
    fontFamily: {
      primary: 'PlayfairDisplay',
      secondary: 'Inter',
      accent: 'Montserrat'
    },
    // ... other typography definitions
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48
  },
  // ... other theme properties
}
```

### 2. Theme Context (`contexts/ThemeContext.tsx`)

The ThemeContext provides theme values and theme switching functionality throughout the app:

```typescript
// Example usage in a component
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>Hello World</Text>
      <Button onPress={toggleTheme} title="Toggle Theme" />
    </View>
  );
}
```

### 3. Theme Style Hooks (`hooks/useThemeStyles.ts`)

Pre-built style hooks for common components:

```typescript
// Example usage of style hooks
import { useTextStyles, useContainerStyles, useButtonStyles } from '@/hooks/useThemeStyles';

function MyComponent() {
  const textStyles = useTextStyles();
  const containerStyles = useContainerStyles();
  const buttonStyles = useButtonStyles();

  return (
    <View style={containerStyles.card}>
      <Text style={textStyles.h1}>Welcome</Text>
      <Text style={textStyles.body}>This is a themed component</Text>
      <View style={buttonStyles.primary}>
        <Text style={buttonStyles.primaryText}>Click Me</Text>
      </View>
    </View>
  );
}
```

## Common Use Cases

### 1. Creating Themed Text

```typescript
import { useTextStyles } from '@/hooks/useThemeStyles';

function ThemedTextExample() {
  const textStyles = useTextStyles();

  return (
    <View>
      <Text style={textStyles.h1}>Main Heading</Text>
      <Text style={textStyles.h2}>Subheading</Text>
      <Text style={textStyles.body}>Regular text content</Text>
      <Text style={textStyles.caption}>Small caption text</Text>
    </View>
  );
}
```

### 2. Creating Themed Containers

```typescript
import { useContainerStyles } from '@/hooks/useThemeStyles';

function ThemedContainerExample() {
  const containerStyles = useContainerStyles();

  return (
    <View style={containerStyles.container}>
      <View style={containerStyles.card}>
        <View style={containerStyles.row}>
          <View style={containerStyles.center}>
            {/* Content */}
          </View>
        </View>
      </View>
    </View>
  );
}
```

### 3. Creating Themed Buttons

```typescript
import { useButtonStyles } from '@/hooks/useThemeStyles';

function ThemedButtonExample() {
  const buttonStyles = useButtonStyles();

  return (
    <View>
      <View style={buttonStyles.primary}>
        <Text style={buttonStyles.primaryText}>Primary Button</Text>
      </View>
      <View style={buttonStyles.secondary}>
        <Text style={buttonStyles.secondaryText}>Secondary Button</Text>
      </View>
    </View>
  );
}
```

### 4. Creating Themed Inputs

```typescript
import { useInputStyles } from '@/hooks/useThemeStyles';

function ThemedInputExample() {
  const inputStyles = useInputStyles();

  return (
    <View>
      <View style={inputStyles.container}>
        <Text style={inputStyles.label}>Username</Text>
        <View style={inputStyles.input}>
          {/* Input content */}
        </View>
      </View>
    </View>
  );
}
```

### 5. Creating Themed Lists

```typescript
import { useListStyles } from '@/hooks/useThemeStyles';

function ThemedListExample() {
  const listStyles = useListStyles();

  return (
    <View style={listStyles.container}>
      <View style={listStyles.item}>
        <Text style={listStyles.itemText}>List Item 1</Text>
      </View>
      <View style={listStyles.item}>
        <Text style={listStyles.itemText}>List Item 2</Text>
      </View>
    </View>
  );
}
```

## Best Practices

1. **Always Use Theme Hooks**: Instead of directly accessing theme values, use the provided style hooks for consistency.

2. **Maintain Hierarchy**: Use the appropriate text styles (h1, h2, body, caption) to maintain visual hierarchy.

3. **Responsive Design**: Use the spacing system consistently for responsive layouts.

4. **Dark Mode Support**: All components should work in both light and dark modes without additional configuration.

5. **Performance**: Use StyleSheet.create for static styles and avoid inline styles.

## Common Pitfalls

1. **Direct Theme Access**: Avoid directly accessing theme values when style hooks are available.
   ```typescript
   // ❌ Don't do this
   const { theme } = useTheme();
   <View style={{ backgroundColor: theme.colors.background }}>

   // ✅ Do this instead
   const containerStyles = useContainerStyles();
   <View style={containerStyles.container}>
   ```

2. **Hard-coded Values**: Avoid hard-coding colors, spacing, or typography values.
   ```typescript
   // ❌ Don't do this
   <View style={{ padding: 16, backgroundColor: '#2C3E50' }}>

   // ✅ Do this instead
   const containerStyles = useContainerStyles();
   <View style={containerStyles.card}>
   ```

3. **Inline Styles**: Avoid using inline styles for themed components.
   ```typescript
   // ❌ Don't do this
   <Text style={{ fontSize: 24, fontFamily: 'PlayfairDisplay' }}>

   // ✅ Do this instead
   const textStyles = useTextStyles();
   <Text style={textStyles.h1}>
   ```

## Testing Themed Components

When testing themed components, make sure to wrap them in the ThemeProvider:

```typescript
import { ThemeProvider } from '@/contexts/ThemeContext';

describe('ThemedComponent', () => {
  it('renders correctly', () => {
    render(
      <ThemeProvider>
        <ThemedComponent />
      </ThemeProvider>
    );
    // Test assertions
  });
});
```

## Additional Resources

- `constants/theme/index.ts` - Complete theme configuration
- `contexts/ThemeContext.tsx` - Theme context implementation
- `hooks/useThemeStyles.ts` - Pre-built style hooks
- `components/ui/` - Themed UI components 