/**
 * Root Layout
 * This is the main layout for the application.
 * It sets up the stack navigator for all routes.
 */

import { ThemeProvider } from '@/contexts/ThemeContext';
import { useAuth } from '@/hooks/useAuth';
import { Redirect, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SplashScreen } from '@/components/ui/SplashScreen';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, loading } = useAuth();

  const handleSplashComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <SplashScreen onAnimationComplete={handleSplashComplete} />;
  }

  // Show a loading screen while checking authentication
  if (loading && !isLoading) {
    return null;
  }

  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: '#041B15',
          },
          animation: 'fade',
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <Stack.Screen
            name="(app)"
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack>
    </ThemeProvider>
  );
}

// Configure the app router settings
export const unstable_settings = {
  initialRouteName: 'index',
};