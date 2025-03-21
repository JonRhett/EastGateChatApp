# EastGate Chat App - Scaffold

This document provides a comprehensive overview of the project's PROPOSED file structure.

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

## Services Directory
- `services/`
  - `supabase/` - Supabase related services
    - `client.ts` - Supabase client configuration
    - `auth.ts` - Authentication service
    - `chat.ts` - Chat service
    - `storage.ts` - Storage service
  - `notifications/` - Push notification services
    - `push.ts` - Push notification handling
    - `emergency.ts` - Emergency alerts

## Hooks Directory
- `hooks/`
  - `useAuth.ts` - Authentication hooks
  - `useChat.ts` - Chat related hooks
  - `useMedia.ts` - Media handling hooks
  - `useNotifications.ts` - Notification hooks
  - `useColorScheme.ts` - Theme hooks
  - `useThemeColor.ts` - Color utility hooks

## Constants Directory
- `constants/`
  - `Colors.ts` - Color definitions
  - `Theme.ts` - Theme configurations
  - `Config.ts` - App configuration
  - `Api.ts` - API endpoints

## Utils Directory
- `utils/`
  - `validation.ts` - Form validation
  - `formatting.ts` - Data formatting
  - `permissions.ts` - Permission helpers
  - `storage.ts` - Local storage helpers

## Assets Directory
- `assets/`
  - `fonts/`
    - `SpaceMono-Regular.ttf` - Space Mono font
  - `images/` - App images
  - `icons/` - App icons

## Types Directory
- `types/`
  - `auth.ts` - Authentication types
  - `chat.ts` - Chat related types
  - `media.ts` - Media types
  - `user.ts` - User related types
  - `event.ts` - Calendar event types

## Scripts Directory
- `scripts/`
  - `reset-project.js` - Reset project script
  - `generate-types.js` - Type generation
  - `deploy.js` - Deployment helpers