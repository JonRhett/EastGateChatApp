/**
 * Home Screen
 * This is the main screen after authentication
 */

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { colors, spacing } from '@/constants/theme';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { authService } from '@/services/supabase/auth';
import { Feather } from '@expo/vector-icons';
import { useProfile } from '@/hooks/useProfile';

export default function HomeScreen() {
  const { profile } = useProfile();
  
  const handleSignOut = async () => {
    try {
      await authService.signOut();
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };
  
  const navigateToProfile = () => {
    router.push('/(app)/profile');
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <ThemedText variant="h1" style={styles.title}>
            Welcome to EastGate
          </ThemedText>
          <TouchableOpacity 
            style={styles.profileButton} 
            onPress={navigateToProfile}
          >
            {profile?.avatar_url ? (
              <View style={styles.avatarContainer}>
                <Image 
                  source={{ uri: profile.avatar_url }} 
                  style={styles.avatar} 
                />
              </View>
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Feather name="user" size={20} color="#D9CFCA" />
              </View>
            )}
          </TouchableOpacity>
        </View>
        <ThemedText variant="body" style={styles.subtitle}>
          Your church community hub
        </ThemedText>
      </View>

      <View style={styles.contentContainer}>
        <ThemedText variant="body" style={styles.text}>
          This is the home screen after authentication. You can add more features here.
        </ThemedText>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.profilePageButton} 
          onPress={navigateToProfile}
        >
          <Feather name="user" size={20} color="#FFFFFF" style={styles.buttonIcon} />
          <ThemedText variant="button" style={styles.buttonText}>
            My Profile
          </ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Feather name="log-out" size={20} color="#FFFFFF" style={styles.buttonIcon} />
          <ThemedText variant="button" style={styles.buttonText}>
            Sign Out
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  header: {
    width: '100%',
    marginTop: spacing.xl,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    color: colors.text.light,
    flex: 1,
  },
  subtitle: {
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
    color: colors.text.light,
    opacity: 0.8,
  },
  profileButton: {
    marginLeft: spacing.md,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#B38769',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8D7361',
    justifyContent: 'center',
    alignItems: 'center',
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
  buttonContainer: {
    width: '100%',
    marginBottom: spacing.xl,
  },
  profilePageButton: {
    backgroundColor: '#8D7361',
    borderRadius: 8,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  signOutButton: {
    backgroundColor: colors.primary.main,
    borderRadius: 8,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: spacing.sm,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});