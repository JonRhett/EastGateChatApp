/**
 * LoginScreen Component
 * An elegant and welcoming login screen for the EastGate Church app
 * Uses the church's established color palette and typography system
 * with a modern, professional design aesthetic
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { authService } from '../../services/supabase/auth';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import * as Font from 'expo-font';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const insets = useSafeAreaInsets();
  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Charm-Regular': require('../../assets/fonts/Charm-Regular.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  const validateForm = () => {
    if (!email.trim()) {
      setErrorMessage('Email is required');
      return false;
    }
    if (!password.trim()) {
      setErrorMessage('Password is required');
      return false;
    }
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    setErrorMessage('');
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await authService.signIn(email, password);
      // Navigation will be handled by the auth state listener in useAuth
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : 'Failed to sign in. Please check your credentials.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setErrorMessage('Please enter your email to reset password');
      return;
    }

    try {
      await authService.resetPassword(email);
      Alert.alert(
        'Password Reset',
        'If an account exists with this email, you will receive password reset instructions.'
      );
    } catch (error) {
      console.error('Password reset error:', error);
      setErrorMessage('Failed to send password reset email. Please try again.');
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#D9CFCA" />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#362517', '#241A13']} // Rich coffee dark to deeper brown
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/images/TanLogo.png')} 
              style={styles.logoImage}
              resizeMode="contain"
              tintColor="#D9CFCA"
            />
          </View>
          
          <View style={styles.circleOverlay1} />
          <View style={styles.circleOverlay2} />
          
          <View style={styles.header}>
            <ThemedText variant="h1" style={[styles.title, { fontFamily: 'Charm-Regular' }]}>
              Praise the Lord!
            </ThemedText>
            <ThemedText variant="body" style={styles.subtitle}>
              Connecting With Jesus...{'\n'}...Building Community
            </ThemedText>
          </View>

          <ThemedView style={styles.formContainer}>
            {errorMessage ? (
              <View style={styles.errorContainer}>
                <Feather name="alert-circle" size={16} color={colors.status.error} style={styles.errorIcon} />
                <ThemedText style={styles.errorText}>{errorMessage}</ThemedText>
              </View>
            ) : null}

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Feather name="mail" size={18} color="#8B8982" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email address"
                  placeholderTextColor="#8B8982"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setErrorMessage('');
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!isLoading}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Feather name="lock" size={18} color="#8B8982" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#8B8982"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setErrorMessage('');
                  }}
                  secureTextEntry={!showPassword}
                  editable={!isLoading}
                />
                <TouchableOpacity 
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.passwordToggle}
                >
                  <Feather 
                    name={showPassword ? "eye-off" : "eye"} 
                    size={18} 
                    color="#8B8982" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.forgotPassword}
              onPress={handleForgotPassword}
              disabled={isLoading}
            >
              <ThemedText variant="caption" style={styles.forgotPasswordText}>
                Forgot Password?
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator 
                  color="#FFFFFF" 
                  size="small" 
                />
              ) : (
                <ThemedText variant="button" style={styles.buttonText}>
                  Sign In
                </ThemedText>
              )}
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <ThemedText variant="caption" style={styles.dividerText}>or</ThemedText>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.signupContainer}>
              <ThemedText variant="body" style={styles.signupText}>
                Don't have an account?{' '}
              </ThemedText>
              <TouchableOpacity 
                onPress={() => router.push('/(auth)/signup')}
                disabled={isLoading}
              >
                <ThemedText variant="body" style={styles.signupLink}>
                  Sign Up
                </ThemedText>
              </TouchableOpacity>
            </View>
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    position: 'relative',
  },
  circleOverlay1: {
    position: 'absolute',
    top: -100,
    left: -100,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(179, 135, 105, 0.08)', // Creamy coffee, very transparent
  },
  circleOverlay2: {
    position: 'absolute',
    bottom: 100,
    right: -150,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(179, 135, 105, 0.05)', // Creamy coffee, very transparent
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: spacing.xl * 1.5,
    marginBottom: spacing.md,
    zIndex: 2,
    width: '100%',
  },
  logoImage: {
    width: '90%',
    height: undefined,
    aspectRatio: 2.5, // Adjust this value based on your logo's actual aspect ratio
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    zIndex: 2,
  },
  title: {
    color: '#D9CFCA', // Soft cream
    marginBottom: spacing.sm,
    textAlign: 'center',
    fontSize: 36, // Adjusted for Charm font
    fontFamily: 'Charm-Regular',
  },
  subtitle: {
    color: '#B38769', // Creamy coffee
    opacity: 0.9,
    textAlign: 'center',
    maxWidth: '80%',
  },
  formContainer: {
    backgroundColor: 'rgba(249, 246, 242, 0.95)', // Very light cream with opacity
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
    marginHorizontal: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(217, 207, 202, 0.3)', // Very subtle border
  },
  errorContainer: {
    backgroundColor: 'rgba(107, 39, 55, 0.08)',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorIcon: {
    marginRight: spacing.sm,
  },
  errorText: {
    color: colors.status.error,
    ...typography.textStyles.caption,
    flex: 1,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: '#E4DAD0', // Light taupe
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    padding: spacing.md,
    color: '#362517', // Dark coffee
    ...typography.textStyles.body,
    height: 50,
  },
  passwordToggle: {
    padding: spacing.sm,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: spacing.xl,
    paddingVertical: spacing.xs,
  },
  forgotPasswordText: {
    color: '#8D7361', // Medium coffee
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#8D7361', // Medium coffee
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    height: 55,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#8D7361',
    opacity: 0.5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E4DAD0', // Light taupe
  },
  dividerText: {
    marginHorizontal: spacing.md,
    color: '#A19389', // Muted taupe
    fontSize: 14,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  signupText: {
    color: '#8D7361', // Medium coffee
  },
  signupLink: {
    color: '#B38769', // Creamy coffee
    fontWeight: '600',
  },
}); 