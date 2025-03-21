/**
 * SignUpScreen Component
 * A welcoming sign-up screen for new members of the EastGate Church app
 * Uses the church's established color palette and typography system
 */

import React, { useState } from 'react';
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
import { supabase } from '../../services/supabase/client';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

export const SignUpScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const insets = useSafeAreaInsets();

  const validateForm = () => {
    if (!firstName.trim()) {
      setErrorMessage('First name is required');
      return false;
    }
    if (!lastName.trim()) {
      setErrorMessage('Last name is required');
      return false;
    }
    
    // Use the authService email validation
    const emailValidation = authService.validateEmail(email);
    if (!emailValidation.valid) {
      setErrorMessage(emailValidation.message || 'Invalid email');
      return false;
    }
    
    // Use the authService password validation
    const passwordValidation = authService.validatePassword(password);
    if (!passwordValidation.valid) {
      setErrorMessage(passwordValidation.message || 'Invalid password');
      return false;
    }
    
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return false;
    }
    
    return true;
  };

  const handleSignUp = async () => {
    setErrorMessage('');
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // 1. Create the user account - this will trigger the database function 
      // to automatically create a profile
      const authData = await authService.signUp(email, password);
      
      if (authData?.user) {
        // 2. Update the profile with first and last name
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            first_name: firstName,
            last_name: lastName
          })
          .eq('id', authData.user.id);

        if (profileError) throw profileError;

        Alert.alert(
          'Account Created',
          'Your account has been created. Please check your email to verify your account, then complete your profile.',
          [{ text: 'Complete Profile', onPress: () => router.push('/(auth)/profile-setup') }]
        );
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : 'Failed to create account. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#2B1D12', '#1A1208']} // Darker rich coffee to very deep brown
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
           
            <ThemedText variant="body" style={styles.subtitle}>
              Where two or three are gathered...{'\n'}...I am there in the midst of them.
            </ThemedText>
          </View>

          <ThemedView style={styles.formContainer}>
            {errorMessage ? (
              <View style={styles.errorContainer}>
                <Feather name="alert-circle" size={16} color={colors.status.error} style={styles.errorIcon} />
                <ThemedText style={styles.errorText}>{errorMessage}</ThemedText>
              </View>
            ) : null}

            <View style={styles.rowContainer}>
              <View style={[styles.inputContainer, styles.halfWidth]}>
                <View style={styles.inputWrapper}>
                  <Feather name="user" size={18} color="#8B8982" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="First name"
                    placeholderTextColor="#8B8982"
                    value={firstName}
                    onChangeText={(text) => {
                      setFirstName(text);
                      setErrorMessage('');
                    }}
                    autoCapitalize="words"
                    editable={!isLoading}
                  />
                </View>
              </View>

              <View style={[styles.inputContainer, styles.halfWidth]}>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Last name"
                    placeholderTextColor="#8B8982"
                    value={lastName}
                    onChangeText={(text) => {
                      setLastName(text);
                      setErrorMessage('');
                    }}
                    autoCapitalize="words"
                    editable={!isLoading}
                  />
                </View>
              </View>
            </View>

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
                  placeholder="Create a password"
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

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Feather name="check-circle" size={18} color="#8B8982" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm your password"
                  placeholderTextColor="#8B8982"
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    setErrorMessage('');
                  }}
                  secureTextEntry={!showConfirmPassword}
                  editable={!isLoading}
                />
                <TouchableOpacity 
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.passwordToggle}
                >
                  <Feather 
                    name={showConfirmPassword ? "eye-off" : "eye"} 
                    size={18} 
                    color="#8B8982" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator 
                  color="#FFFFFF" 
                  size="small" 
                />
              ) : (
                <ThemedText variant="button" style={styles.buttonText}>
                  Create Account
                </ThemedText>
              )}
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <ThemedText variant="caption" style={styles.dividerText}>or</ThemedText>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.loginContainer}>
              <ThemedText variant="body" style={styles.loginText}>
                Already have an account?{' '}
              </ThemedText>
              <TouchableOpacity 
                onPress={() => router.push('/(auth)/login')}
                disabled={isLoading}
              >
                <ThemedText variant="body" style={styles.loginLink}>
                  Sign In
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
    backgroundColor: '#1A1208', // Deeper coffee color for fallback
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
    right: -100,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(179, 135, 105, 0.08)', // Creamy coffee, very transparent
  },
  circleOverlay2: {
    position: 'absolute',
    bottom: 100,
    left: -150,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(179, 135, 105, 0.05)', // Creamy coffee, very transparent
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    zIndex: 2,
    width: '100%',
  },
  logoImage: {
    width: '90%',
    height: undefined,
    aspectRatio: 2.5,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.md,
    zIndex: 2,
  },
  title: {
    color: '#D9CFCA', // Soft cream
    marginBottom: spacing.sm,
    textAlign: 'center',
    fontWeight: '700',
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
    padding: spacing.lg,
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
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  loginText: {
    color: '#8D7361', // Medium coffee
  },
  loginLink: {
    color: '#B38769', // Creamy coffee
    fontWeight: '600',
  },
}); 