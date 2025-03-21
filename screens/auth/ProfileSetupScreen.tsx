/**
 * ProfileSetupScreen Component
 * Initial profile setup for new users after registration
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
  Image,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProfileImagePicker } from '@/components/media/ProfileImagePicker';
import { router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useProfile } from '@/hooks/useProfile';

export const ProfileSetupScreen = () => {
  const { profile, loading: profileLoading, updateProfile, uploadAvatar } = useProfile();
  const insets = useSafeAreaInsets();
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Form state
  const [firstName, setFirstName] = useState(profile?.first_name || '');
  const [lastName, setLastName] = useState(profile?.last_name || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [address, setAddress] = useState(profile?.address || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [avatarUri, setAvatarUri] = useState<string | null>(profile?.avatar_url || null);
  
  // Skip completing profile for now
  const handleSkip = () => {
    Alert.alert(
      'Skip Profile Setup',
      'You can complete your profile later from the profile page. Continue to the app now?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Continue', onPress: () => router.push('/(app)/home') }
      ]
    );
  };
  
  // Validate the form
  const validateForm = () => {
    if (!firstName.trim()) {
      setErrorMessage('First name is required');
      return false;
    }
    if (!lastName.trim()) {
      setErrorMessage('Last name is required');
      return false;
    }
    return true;
  };
  
  // Complete profile setup
  const handleCompleteSetup = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await updateProfile({
        first_name: firstName,
        last_name: lastName,
        phone,
        address,
        bio,
      });
      
      Alert.alert(
        'Profile Complete',
        'Your profile has been set up successfully!',
        [{ text: 'Continue', onPress: () => router.push('/(app)/home') }]
      );
    } catch (error) {
      console.error('Error setting up profile:', error);
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : 'Failed to set up profile. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  // All image handling is now managed by the ProfileImagePicker component
  
  if (profileLoading) {
    return (
      <LinearGradient
        colors={['#2B1D12', '#1A1208']}
        style={[styles.container, { paddingTop: insets.top }]}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#D9CFCA" />
          <ThemedText style={styles.loadingText}>Loading profile...</ThemedText>
        </View>
      </LinearGradient>
    );
  }
  
  return (
    <LinearGradient
      colors={['#2B1D12', '#1A1208']}
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
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <ThemedText variant="h2" style={styles.title}>
                Complete Your Profile
              </ThemedText>
            </View>
            <ThemedText variant="body" style={styles.subtitle}>
              Let's get to know you better! Add some information to your profile.
            </ThemedText>
          </View>
          
          {/* Profile Card */}
          <ThemedView style={styles.profileCard}>
            {/* Profile picture section */}
            <View style={styles.avatarSection}>
              <ProfileImagePicker 
                avatarUrl={avatarUri}
                onImageSelected={async (base64Image) => {
                  try {
                    const url = await uploadAvatar(base64Image);
                    setAvatarUri(url);
                    return Promise.resolve();
                  } catch (error) {
                    console.error('Error in uploading avatar:', error);
                    return Promise.reject(error);
                  }
                }}
                size={120}
                showRemoveButton={false}
              />
              
              <ThemedText variant="caption" style={styles.photoHelp}>
                Add a profile photo
              </ThemedText>
            </View>
            
            {/* Error message */}
            {errorMessage ? (
              <View style={styles.errorContainer}>
                <Feather name="alert-circle" size={16} color="#6B2737" />
                <ThemedText style={styles.errorText}>{errorMessage}</ThemedText>
              </View>
            ) : null}
            
            {/* Form fields */}
            <View style={styles.formSection}>
              <View style={styles.fieldContainer}>
                <ThemedText style={styles.fieldLabel}>First Name <ThemedText style={styles.required}>*</ThemedText></ThemedText>
                <TextInput
                  style={styles.input}
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="Enter your first name"
                  placeholderTextColor="#8B8982"
                  editable={!isLoading}
                />
              </View>
              
              <View style={styles.fieldContainer}>
                <ThemedText style={styles.fieldLabel}>Last Name <ThemedText style={styles.required}>*</ThemedText></ThemedText>
                <TextInput
                  style={styles.input}
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Enter your last name"
                  placeholderTextColor="#8B8982"
                  editable={!isLoading}
                />
              </View>
              
              <View style={styles.fieldContainer}>
                <ThemedText style={styles.fieldLabel}>Phone</ThemedText>
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Enter your phone number"
                  placeholderTextColor="#8B8982"
                  keyboardType="phone-pad"
                  editable={!isLoading}
                />
              </View>
              
              <View style={styles.fieldContainer}>
                <ThemedText style={styles.fieldLabel}>Address</ThemedText>
                <TextInput
                  style={styles.input}
                  value={address}
                  onChangeText={setAddress}
                  placeholder="Enter your address"
                  placeholderTextColor="#8B8982"
                  editable={!isLoading}
                  multiline
                />
              </View>
              
              <View style={styles.fieldContainer}>
                <ThemedText style={styles.fieldLabel}>Bio</ThemedText>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={bio}
                  onChangeText={setBio}
                  placeholder="Tell us a bit about yourself"
                  placeholderTextColor="#8B8982"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  editable={!isLoading}
                />
              </View>
            </View>
            
            {/* Action buttons */}
            <TouchableOpacity
              style={[styles.completeButton, isLoading && styles.buttonDisabled]}
              onPress={handleCompleteSetup}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <ThemedText style={styles.completeButtonText}>
                  Complete Profile
                </ThemedText>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.skipButton}
              onPress={handleSkip}
              disabled={isLoading}
            >
              <ThemedText style={styles.skipButtonText}>
                Skip for now
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1208', // Fallback color
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#D9CFCA',
    marginTop: 16,
    fontSize: 16,
  },
  header: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    color: '#D9CFCA',
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: '#B38769',
    textAlign: 'center',
    marginTop: 8,
    maxWidth: '80%',
  },
  profileCard: {
    backgroundColor: 'rgba(249, 246, 242, 0.95)',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(217, 207, 202, 0.3)',
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 8,
    backgroundColor: '#F9F6F2',
    borderWidth: 4,
    borderColor: '#B38769',
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E4DAD0',
  },
  avatarOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(54, 37, 23, 0.7)',
    paddingVertical: 8,
  },
  avatarAction: {
    marginHorizontal: 8,
    padding: 4,
  },
  photoHelp: {
    color: '#8D7361',
    fontSize: 14,
  },
  errorContainer: {
    backgroundColor: 'rgba(107, 39, 55, 0.08)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    color: '#6B2737',
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },
  formSection: {
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    color: '#8D7361',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
  },
  required: {
    color: '#6B2737',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E4DAD0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#362517',
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  completeButton: {
    backgroundColor: '#8D7361',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  skipButton: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  skipButtonText: {
    color: '#B38769',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default ProfileSetupScreen;