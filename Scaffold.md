# EastGate Church Communication Hub - Project Structure

This document provides an overview of the project's directory structure and key files.

## Core Architecture

The application uses a modern architecture built with:
- **Expo/React Native**: Core mobile framework
- **TypeScript**: For type-safe development
- **Expo Router**: File-based navigation
- **Supabase**: Backend services (auth, database, storage)

## Directory Structure

### Root Structure

```
EastGateChatApp/
├── app/                  # Expo Router application entry point
├── assets/               # Static assets (images, fonts)
├── components/           # Reusable UI components
├── constants/            # App constants and theme configuration
├── contexts/             # React context providers
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── screens/              # Screen components
├── services/             # Service integrations
├── supabase/             # Supabase configuration and migrations
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## Key Files and Directories

### Navigation and App Entry (`app/`)

The app uses Expo Router for file-based navigation:

| File | Description |
|------|-------------|
| `app/_layout.tsx` | Root layout that manages app-wide navigation and auth state |
| `app/index.tsx` | Entry point that redirects to the login screen |
| `app/(auth)/_layout.tsx` | Layout for authentication routes |
| `app/(auth)/login.tsx` | Route for login screen |
| `app/(auth)/signup.tsx` | Route for signup screen |
| `app/(app)/_layout.tsx` | Layout for authenticated app routes |
| `app/(app)/home.tsx` | Home screen for authenticated users |

### Authentication System

| File | Description |
|------|-------------|
| `screens/auth/LoginScreen.tsx` | Login screen with coffee-inspired design |
| `screens/auth/SignUpScreen.tsx` | Signup screen with coffee-inspired design |
| `services/supabase/auth.ts` | Authentication service for Supabase integration |
| `services/supabase/client.ts` | Supabase client configuration |
| `hooks/useAuth.ts` | Hook for authentication state management |
| `types/auth.ts` | TypeScript types for authentication |

### UI Components

| File | Description |
|------|-------------|
| `components/ui/SplashScreen.tsx` | Beautiful splash screen with animations |
| `components/ThemedText.tsx` | Text component with theme integration |
| `components/ThemedView.tsx` | View component with theme integration |
| `components/ui/IconSymbol.tsx` | Cross-platform icon component |
| `components/ui/IconSymbol.ios.tsx` | iOS-specific icon implementation |

### Theming System

| File | Description |
|------|-------------|
| `constants/theme/index.ts` | Main theme configuration (colors, typography, etc.) |
| `constants/theme/typography.ts` | Typography definitions |
| `constants/theme/spacing.ts` | Spacing system configuration |
| `contexts/ThemeContext.tsx` | Theme context provider |
| `hooks/useThemeStyles.ts` | Hook for accessing themed styles |
| `hooks/useColorScheme.ts` | Hook for device color scheme integration |

### Backend Services

| File | Description |
|------|-------------|
| `lib/supabase.ts` | Supabase utilities |
| `supabase/migrations/*.sql` | Database migrations |
| `supabase/config.toml` | Supabase configuration |

### Configuration Files

| File | Description |
|------|-------------|
| `app.json` | Expo configuration |
| `package.json` | Node dependencies |
| `tsconfig.json` | TypeScript configuration |
| `babel.config.js` | Babel configuration |
| `metro.config.js` | Metro bundler configuration |
| `.env` | Environment variables (not committed to git) |

## Visual Design

The app uses a sophisticated coffee-inspired color palette:

- **Rich dark browns**: #362517, #241A13 (backgrounds)
- **Medium coffee tones**: #8D7361 (buttons and accents)
- **Creamy coffee**: #B38769 (highlights and secondary elements)
- **Soft cream**: #D9CFCA (text and borders)
- **Very light cream**: #F9F6F242 (cards and form backgrounds)
- **Light taupe**: #E4DAD0 (dividers and subtle elements)

## Implementation Details

### Authentication Flow

The authentication system is built with Supabase Auth and includes:
- Email/password authentication
- Password reset functionality
- Email verification
- User profiles with first/last name storage
- Session management with useAuth hook

### Navigation Structure

- The app uses a nested route structure with Expo Router
- Routes are organized by functionality ((auth), (app))
- Protected routes redirect based on authentication state
- Navigation is managed through the router context

### UI Components

- All screens use a consistent theming system
- Components are built with proper TypeScript typing
- Form validation is implemented for login and signup
- Loading states and error handling are properly managed
- Animations are used for smoother user experience