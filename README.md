# EastGate Church Communication Hub

A mobile application for EastGate Church members to connect, communicate, and stay informed.

## Features

- User authentication and profile management
- Coffee-inspired UI with modern animations
- File-based navigation with Expo Router
- Backend powered by Supabase

## Getting Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Set up environment variables
   
   Create a `.env` file in the root directory with your Supabase credentials:
   
   ```
   SUPABASE_URL=your-supabase-url
   SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

3. Apply database migrations
   
   If you have Supabase CLI installed:
   
   ```bash
   bash scripts/apply-migrations.sh
   ```
   
   Otherwise, follow the manual migration guide in `scripts/manual-migration-guide.md`

4. Start the development server

   ```bash
   npx expo start
   ```

## Project Structure

- **app/**: File-based routing with Expo Router
- **components/**: Reusable UI components
- **hooks/**: Custom React hooks
- **services/**: Supabase service integrations
- **types/**: TypeScript type definitions
- **constants/**: App constants and theme configuration
- **supabase/**: Supabase migrations and configuration

## User Profiles

The app includes a comprehensive user profile system:

- Basic information (name, email, etc.)
- Profile picture upload and management
- Ministry roles
- Contact information

Profile data is stored in Supabase with appropriate security policies.

## Development

For more detailed information, see:
- `Scaffold.md` - Project structure overview
- `DevPlan.MD` - Development plan and roadmap
- `ThemeDoc.md` - Theme and styling documentation

## Tech Stack

- **Frontend**: Expo/React Native, TypeScript, Expo Router
- **UI**: React Native Reanimated, Linear Gradient, Safe Area Context
- **Backend**: Supabase (Auth, Database, Storage)
- **State Management**: React Context API and custom hooks
