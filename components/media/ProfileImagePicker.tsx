/**
 * ProfileImagePicker Component
 * Component for selecting, cropping and uploading profile images
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

import { ThemedText } from '@/components/ThemedText';

interface ProfileImagePickerProps {
  avatarUrl: string | null;
  onImageSelected: (base64Image: string) => Promise<void>;
  onImageRemoved?: () => Promise<void>;
  size?: number;
  showRemoveButton?: boolean;
  editable?: boolean;
}

export const ProfileImagePicker = ({
  avatarUrl,
  onImageSelected,
  onImageRemoved,
  size = 120,
  showRemoveButton = true,
  editable = true,
}: ProfileImagePickerProps) => {
  const [isLoading, setIsLoading] = useState(false);

  // Take a photo with the camera
  const handleTakePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Camera Permission Required',
          'Please grant camera permission to take a profile photo'
        );
        return;
      }
      
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        await processImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Unable to take photo. Please try again.');
    }
  };
  
  // Pick an image from the photo library
  const handlePickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Photo Library Permission Required',
          'Please grant photo library permission to select a profile photo'
        );
        return;
      }
      
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        await processImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Unable to select image. Please try again.');
    }
  };
  
  // Process, resize and crop the image
  const processImage = async (uri: string) => {
    try {
      setIsLoading(true);
      
      // Resize and crop the image to a square
      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 400, height: 400 } }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );
      
      // Convert to base64
      const response = await fetch(manipResult.uri);
      const blob = await response.blob();
      
      return new Promise<void>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async () => {
          try {
            const base64data = reader.result as string;
            
            // Call the onImageSelected callback with the base64 data
            await onImageSelected(base64data);
            setIsLoading(false);
            resolve();
          } catch (err) {
            setIsLoading(false);
            console.error('Error with selected image:', err);
            Alert.alert('Error', 'Failed to process profile picture. Please try again.');
            reject(err);
          }
        };
        reader.onerror = () => {
          setIsLoading(false);
          reject(new Error('Failed to convert image'));
        };
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      setIsLoading(false);
      console.error('Error processing image:', error);
      Alert.alert('Error', 'Unable to process image. Please try again.');
    }
  };
  
  // Show Action Sheet for image options
  const handleImageOptions = () => {
    if (!editable) return;
    
    Alert.alert(
      'Profile Picture',
      'Choose an option',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Take Photo', onPress: handleTakePhoto },
        { text: 'Choose from Library', onPress: handlePickImage },
        ...(showRemoveButton && avatarUrl && onImageRemoved 
          ? [{ text: 'Remove Photo', onPress: handleRemovePhoto, style: 'destructive' as 'destructive' }] 
          : []),
      ]
    );
  };
  
  // Handle remove photo
  const handleRemovePhoto = async () => {
    if (!onImageRemoved) return;
    
    try {
      setIsLoading(true);
      await onImageRemoved();
    } catch (error) {
      console.error('Error removing photo:', error);
      Alert.alert('Error', 'Failed to remove profile picture');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { width: size, height: size, borderRadius: size / 2 }
      ]}
      onPress={handleImageOptions}
      disabled={!editable || isLoading}
    >
      {avatarUrl ? (
        <Image 
          source={{ uri: avatarUrl }}
          style={styles.image}
        />
      ) : (
        <View style={styles.placeholder}>
          <Feather name="user" size={size / 2.5} color="#8D7361" />
        </View>
      )}
      
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      )}
      
      {editable && !isLoading && (
        <View style={styles.editOverlay}>
          <Feather name="camera" size={size / 6} color="#FFFFFF" />
          <ThemedText style={styles.editText}>
            {avatarUrl ? 'Change' : 'Add'}
          </ThemedText>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#F9F6F2',
    borderWidth: 4,
    borderColor: '#B38769',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E4DAD0',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(54, 37, 23, 0.7)',
    paddingVertical: 6,
    alignItems: 'center',
  },
  editText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 2,
  }
});

export default ProfileImagePicker;