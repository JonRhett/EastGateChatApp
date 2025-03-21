/**
 * Home Screen
 * This is the main screen after authentication
 */

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { colors, spacing } from '@/constants/theme';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { authService } from '@/services/supabase/auth';

export default function HomeScreen() {
  const handleSignOut = async () => {
    try {
      await authService.signOut();
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText variant="h1" style={styles.title}>
        Welcome to EastGate
      </ThemedText>
      <ThemedText variant="body" style={styles.subtitle}>
        Your church community hub
      </ThemedText>

      <View style={styles.contentContainer}>
        <ThemedText variant="body" style={styles.text}>
          This is the home screen after authentication. You can add more features here.
        </ThemedText>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <ThemedText variant="button" style={styles.buttonText}>
          Sign Out
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.lg,
  },
  title: {
    marginTop: spacing.xl * 2,
    marginBottom: spacing.sm,
    textAlign: 'center',
    color: colors.text.light,
  },
  subtitle: {
    marginBottom: spacing.xl,
    textAlign: 'center',
    color: colors.text.light,
    opacity: 0.8,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: colors.text.light,
  },
  button: {
    backgroundColor: colors.primary.main,
    borderRadius: 8,
    padding: spacing.md,
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  buttonText: {
    color: colors.text.dark,
  },
});