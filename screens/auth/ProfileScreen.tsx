/**
 * ProfileScreen Component
 * Allows users to view and edit their profile information
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
import { useAuth } from '@/hooks/useAuth';

export const ProfileScreen = () => {
  const { profile, loading: profileLoading, updateProfile, uploadAvatar, deleteAvatar } = useProfile();
  const { signOut } = useAuth();
  const insets = useSafeAreaInsets();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Form state
  const [firstName, setFirstName] = useState(profile?.first_name || '');
  const [lastName, setLastName] = useState(profile?.last_name || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [address, setAddress] = useState(profile?.address || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [avatarUri, setAvatarUri] = useState<string | null>(profile?.avatar_url || null);
  
  // Reset form to current profile values
  const resetForm = () => {
    setFirstName(profile?.first_name || '');
    setLastName(profile?.last_name || '');
    setPhone(profile?.phone || '');
    setAddress(profile?.address || '');
    setBio(profile?.bio || '');
    setAvatarUri(profile?.avatar_url || null);
  };
  
  // Enter edit mode
  const handleEdit = () => {
    resetForm();
    setIsEditing(true);
  };
  
  // Cancel editing
  const handleCancel = () => {
    resetForm();
    setIsEditing(false);
    setErrorMessage('');
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
  
  // Save profile changes
  const handleSave = async () => {
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
      
      setIsEditing(false);
      setErrorMessage('');
      Alert.alert('Success', 'Your profile has been updated');
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : 'Failed to update profile. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  // Remove the profile picture
  const handleRemovePhoto = async () => {
    try {
      if (!avatarUri) return Promise.resolve();
      
      return new Promise<void>((resolve, reject) => {
        Alert.alert(
          'Remove Profile Picture',
          'Are you sure you want to remove your profile picture?',
          [
            { 
              text: 'Cancel', 
              style: 'cancel',
              onPress: () => resolve()
            },
            {
              text: 'Remove',
              style: 'destructive',
              onPress: async () => {
                setIsLoading(true);
                try {
                  await deleteAvatar();
                  setAvatarUri(null);
                  resolve();
                } catch (error) {
                  console.error('Error removing profile picture:', error);
                  Alert.alert('Error', 'Failed to remove profile picture');
                  reject(error);
                } finally {
                  setIsLoading(false);
                }
              },
            },
          ]
        );
      });
    } catch (error) {
      console.error('Error removing photo:', error);
      return Promise.reject(error);
    }
  };
  
  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/(auth)/login');
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };
  
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
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <Feather name="arrow-left" size={24} color="#D9CFCA" />
              </TouchableOpacity>
              
              <ThemedText variant="h2" style={styles.title}>
                {isEditing ? 'Edit Profile' : 'My Profile'}
              </ThemedText>
              
              {!isEditing ? (
                <TouchableOpacity 
                  style={styles.editButton}
                  onPress={handleEdit}
                >
                  <Feather name="edit-2" size={20} color="#B38769" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={handleCancel}
                >
                  <Feather name="x" size={24} color="#B38769" />
                </TouchableOpacity>
              )}
            </View>
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
                onImageRemoved={handleRemovePhoto}
                size={120}
                editable={isEditing}
              />
              
              <ThemedText variant="h3" style={styles.profileName}>
                {profile?.first_name || ''} {profile?.last_name || ''}
              </ThemedText>
              
              <ThemedText variant="body" style={styles.profileEmail}>
                {profile?.email || ''}
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
                <ThemedText style={styles.fieldLabel}>First Name</ThemedText>
                {isEditing ? (
                  <TextInput
                    style={styles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="Enter your first name"
                    placeholderTextColor="#8B8982"
                    editable={!isLoading}
                  />
                ) : (
                  <ThemedText style={styles.fieldValue}>
                    {profile?.first_name || '-'}
                  </ThemedText>
                )}
              </View>
              
              <View style={styles.fieldContainer}>
                <ThemedText style={styles.fieldLabel}>Last Name</ThemedText>
                {isEditing ? (
                  <TextInput
                    style={styles.input}
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="Enter your last name"
                    placeholderTextColor="#8B8982"
                    editable={!isLoading}
                  />
                ) : (
                  <ThemedText style={styles.fieldValue}>
                    {profile?.last_name || '-'}
                  </ThemedText>
                )}
              </View>
              
              <View style={styles.fieldContainer}>
                <ThemedText style={styles.fieldLabel}>Email</ThemedText>
                <ThemedText style={styles.fieldValue}>
                  {profile?.email || '-'}
                </ThemedText>
              </View>
              
              <View style={styles.fieldContainer}>
                <ThemedText style={styles.fieldLabel}>Phone</ThemedText>
                {isEditing ? (
                  <TextInput
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Enter your phone number"
                    placeholderTextColor="#8B8982"
                    keyboardType="phone-pad"
                    editable={!isLoading}
                  />
                ) : (
                  <ThemedText style={styles.fieldValue}>
                    {profile?.phone || '-'}
                  </ThemedText>
                )}
              </View>
              
              <View style={styles.fieldContainer}>
                <ThemedText style={styles.fieldLabel}>Address</ThemedText>
                {isEditing ? (
                  <TextInput
                    style={styles.input}
                    value={address}
                    onChangeText={setAddress}
                    placeholder="Enter your address"
                    placeholderTextColor="#8B8982"
                    editable={!isLoading}
                    multiline
                  />
                ) : (
                  <ThemedText style={styles.fieldValue}>
                    {profile?.address || '-'}
                  </ThemedText>
                )}
              </View>
              
              <View style={styles.fieldContainer}>
                <ThemedText style={styles.fieldLabel}>Bio</ThemedText>
                {isEditing ? (
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
                ) : (
                  <ThemedText style={styles.fieldValue}>
                    {profile?.bio || '-'}
                  </ThemedText>
                )}
              </View>
            </View>
            
            {/* Action buttons */}
            {isEditing && (
              <TouchableOpacity
                style={[styles.saveButton, isLoading && styles.buttonDisabled]}
                onPress={handleSave}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <ThemedText style={styles.saveButtonText}>
                    Save Changes
                  </ThemedText>
                )}
              </TouchableOpacity>
            )}
            
            {!isEditing && (
              <TouchableOpacity
                style={styles.signOutButton}
                onPress={handleSignOut}
              >
                <Feather name="log-out" size={18} color="#6B2737" />
                <ThemedText style={styles.signOutText}>Sign Out</ThemedText>
              </TouchableOpacity>
            )}
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
    paddingVertical: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  title: {
    color: '#D9CFCA',
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
  },
  editButton: {
    padding: 8,
  },
  cancelButton: {
    padding: 8,
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
    marginBottom: 16,
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
  avatarRemove: {
    marginLeft: 8,
  },
  profileName: {
    color: '#362517',
    fontWeight: '600',
    marginBottom: 4,
  },
  profileEmail: {
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
  fieldValue: {
    color: '#362517',
    fontSize: 16,
    paddingVertical: 8,
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
  saveButton: {
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
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E4DAD0',
  },
  signOutText: {
    color: '#6B2737',
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ProfileScreen;