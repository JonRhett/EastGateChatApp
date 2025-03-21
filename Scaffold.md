# EastGate Chat App - Scaffold

This document provides a comprehensive overview of the project's PROPOSED file structure.

## Root Directory
- `package.json` - Project dependencies and scripts
- `app.json` - Expo configuration file
- `tsconfig.json` - TypeScript configuration
- `README.md` - Project documentation
- `DevPlan.MD` - Development plan and roadmap
- `.gitignore` - Specifies files to be ignored by Git

## App Directory
- `app/`
  - `(tabs)/` - Tab-based navigation
    - `_layout.tsx` - Tab layout configuration
    - `index.tsx` - Home screen
    - `explore.tsx` - Explore screen
  - `+not-found.tsx` - 404 page
  - `_layout.tsx` - Root app layout

## Components Directory
- `components/`
  - `Collapsible.tsx` - Collapsible component
  - `ExternalLink.tsx` - External link component
  - `HapticTab.tsx` - Tab with haptic feedback
  - `HelloWave.tsx` - Wave animation component
  - `ParallaxScrollView.tsx` - Parallax scrolling component
  - `ThemedText.tsx` - Text component with theme support
  - `ThemedView.tsx` - View component with theme support
  - `__tests__/` - Component tests
    - `ThemedText-test.tsx` - Tests for ThemedText
    - `__snapshots__/` - Test snapshots
      - `ThemedText-test.tsx.snap` - Snapshot for ThemedText
  - `ui/` - UI components
    - `IconSymbol.tsx` - Icon component (default)
    - `IconSymbol.ios.tsx` - iOS-specific icon component
    - `TabBarBackground.tsx` - Tab bar background (default)
    - `TabBarBackground.ios.tsx` - iOS-specific tab bar background

## Constants Directory
- `constants/`
  - `Colors.ts` - Color definitions for themes

## Hooks Directory
- `hooks/`
  - `useColorScheme.ts` - Hook for accessing color scheme (default)
  - `useColorScheme.web.ts` - Web-specific color scheme hook
  - `useThemeColor.ts` - Hook for theme colors

## Assets Directory
- `assets/`
  - `fonts/`
    - `SpaceMono-Regular.ttf` - Space Mono font
  - `images/` - App images
    - Various image files for icons and UI

## Scripts Directory
- `scripts/`
  - `reset-project.js` - Script to reset project to a blank state

## Configuration Files
- `.expo/` - Expo configuration
  - `devices.json` - Connected devices information
  - `README.md` - Expo directory explanation
  - `types/` - TypeScript types for Expo
    - `router.d.ts` - Router type definitions