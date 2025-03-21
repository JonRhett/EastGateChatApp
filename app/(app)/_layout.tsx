/**
 * App Layout
 * This layout is used for the main app screens after authentication
 */

import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        contentStyle: {
          backgroundColor: '#041B15',
        },
      }}
    />
  );
}