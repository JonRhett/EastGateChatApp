# EastGate Chat App - Scaffold

This document provides a comprehensive overview of the project's file structure.

## Root Directory
- `package.json` - Project dependencies and scripts
- `package-lock.json` - Locked versions of dependencies
- `app.json` - Expo configuration file
- `tsconfig.json` - TypeScript configuration
- `babel.config.js` - Babel configuration for React Native
- `expo-env.d.ts` - Expo environment type definitions
- `README.md` - Project documentation
- `DevPlan.MD` - Development plan and roadmap
- `.gitignore` - Specifies files to be ignored by Git
- `.env` - Environment variables
- `eas.json` - Expo Application Services configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration

## Configuration Directories
- `.expo/` - Expo configuration files
- `.vscode/` - VS Code editor settings
- `supabase/` - Supabase configuration and migrations
- `docs/` - Project documentation

## App Directory
- `app/`
  - `(auth)/` - Authentication screens
    - `_layout.tsx` - Auth layout configuration
    - `login.tsx` - Login screen
    - `signup.tsx` - Sign up screen
    - `forgot-password.tsx` - Password reset screen
    - `verify-email.tsx` - Email verification screen
  - `(tabs)/` - Tab-based navigation
    - `_layout.tsx` - Tab layout configuration
    - `home.tsx` - Home screen
    - `chat.tsx` - Chat screen
    - `calendar.tsx` - Calendar screen
    - `media.tsx` - Media libraries screen
    - `directory.tsx` - Church directory screen
  - `(admin)/` - Admin panel screens (web)
    - `_layout.tsx` - Admin layout configuration
    - `dashboard.tsx` - Admin dashboard
    - `users.tsx` - User management
    - `roles.tsx` - Role management
    - `content.tsx` - Content management
  - `+not-found.tsx` - 404 page
  - `_layout.tsx` - Root app layout

## Components Directory
- `components/`
  - `auth/` - Authentication components
    - `AuthForm.tsx` - Reusable auth form
    - `SocialAuth.tsx` - Social authentication buttons
  - `chat/` - Chat components
    - `ChatList.tsx` - List of chat rooms
    - `ChatRoom.tsx` - Individual chat room
    - `MessageBubble.tsx` - Message display
    - `MessageInput.tsx` - Message input component
    - `TypingIndicator.tsx` - Typing status
  - `media/` - Media components
    - `PhotoGallery.tsx` - Photo gallery view
    - `VideoPlayer.tsx` - Video playback
    - `DocumentViewer.tsx` - Document preview
  - `calendar/` - Calendar components
    - `MonthView.tsx` - Monthly calendar view
    - `EventList.tsx` - Event listing
    - `EventDetails.tsx` - Event details
  - `directory/` - Directory components
    - `ContactList.tsx` - Contact listing
    - `ContactCard.tsx` - Contact details
  - `ui/` - UI components
    - `IconSymbol.tsx` - Icon component (default)
    - `IconSymbol.ios.tsx` - iOS-specific icon component
    - `TabBarBackground.tsx` - Tab bar background
    - `Button.tsx` - Custom button component
    - `Input.tsx` - Custom input component
    - `Modal.tsx` - Custom modal component
    - `Card.tsx` - Themed card component
    - `List.tsx` - Themed list component
    - `Badge.tsx` - Status badge component
    - `Avatar.tsx` - User avatar component
    - `Loading.tsx` - Loading indicator
    - `Error.tsx` - Error display component
  - `common/` - Common components
    - `Collapsible.tsx` - Collapsible component
    - `ExternalLink.tsx` - External link component
    - `HapticTab.tsx` - Tab with haptic feedback
    - `HelloWave.tsx` - Wave animation component
    - `ParallaxScrollView.tsx` - Parallax scrolling component
    - `ThemedText.tsx` - Text component with theme support
    - `ThemedView.tsx` - View component with theme support
  - `__tests__/` - Component tests
    - `__snapshots__/` - Test snapshots

## Theme System
- `constants/`
  - `theme/`
    - `index.ts` - Main theme configuration
    - `colors.ts` - Color system
    - `typography.ts` - Typography system
    - `spacing.ts` - Spacing system
    - `shadows.ts` - Shadow system
    - `animation.ts` - Animation configuration
  - `Colors.ts` - Color definitions
  - `Config.ts` - App configuration
  - `Api.ts` - API endpoints

## Contexts Directory
- `contexts/`
  - `ThemeContext.tsx` - Theme context provider
  - `AuthContext.tsx` - Authentication context
  - `ChatContext.tsx` - Chat state management
  - `MediaContext.tsx` - Media state management

## Hooks Directory
- `hooks/`
  - `useAuth.ts` - Authentication hooks
  - `useChat.ts` - Chat related hooks
  - `useMedia.ts` - Media handling hooks
  - `useNotifications.ts` - Notification hooks
  - `useColorScheme.ts` - Theme hooks
  - `useThemeColor.ts` - Color utility hooks
  - `useThemeStyles.ts` - Theme style hooks
  - `useAnimation.ts` - Animation hooks
  - `useGesture.ts` - Gesture handling hooks

## Utils Directory
- `utils/`
  - `validation.ts` - Form validation
  - `formatting.ts` - Data formatting
  - `permissions.ts` - Permission helpers
  - `storage.ts` - Local storage helpers
  - `theme.ts` - Theme utilities
  - `animation.ts` - Animation utilities

## Assets Directory
- `assets/`
  - `fonts/`
    - `PlayfairDisplay-Regular.ttf` - Primary font
    - `PlayfairDisplay-Bold.ttf` - Primary font bold
    - `Inter-Regular.ttf` - Secondary font
    - `Inter-Medium.ttf` - Secondary font medium
    - `Inter-SemiBold.ttf` - Secondary font semibold
    - `Inter-Bold.ts` - Secondary font bold
    - `Montserrat-Regular.ttf` - Accent font
    - `Montserrat-Medium.ttf` - Accent font medium
    - `Montserrat-SemiBold.ttf` - Accent font semibold
    - `Montserrat-Bold.ttf` - Accent font bold
  - `images/` - App images
  - `icons/` - App icons
  - `animations/` - Lottie animations

## Types Directory
- `types/`
  - `auth.ts` - Authentication types
  - `chat.ts` - Chat related types
  - `media.ts` - Media types
  - `user.ts` - User related types
  - `event.ts` - Calendar event types
  - `theme.ts` - Theme types

## Scripts Directory
- `scripts/`
  - `reset-project.js` - Reset project script
  - `generate-types.js` - Type generation
  - `deploy.js` - Deployment helpers