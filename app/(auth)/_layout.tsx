/**
 * Auth Layout
 * This layout handles the authentication screens (login, signup)
 */

import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#041B15',
        },
        animation: 'fade',
      }}
    />
  );
}