/**
 * Root layout component.
 * Provides basic navigation structure for the app.
 */

import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
