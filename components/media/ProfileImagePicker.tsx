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
      
      console.log('Starting image processing for URI:', uri);
      
      // Resize and crop the image to a square
      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 300, height: 300 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      
      console.log('Image manipulated successfully, URI:', manipResult.uri);
      
      // Convert to base64
      try {
        const response = await fetch(manipResult.uri);
        const blob = await response.blob();
        console.log('Blob created, size:', blob.size);
        
        const reader = new FileReader();
        
        // Wrap the FileReader in a promise
        const base64Promise = new Promise<string>((resolve, reject) => {
          reader.onload = () => {
            try {
              const base64data = reader.result as string;
              console.log('Base64 conversion successful, length:', base64data.length);
              resolve(base64data);
            } catch (err) {
              console.error('Error in reader.onload:', err);
              reject(err);
            }
          };
          
          reader.onerror = (error) => {
            console.error('FileReader error:', error);
            reject(new Error('Failed to convert image to base64'));
          };
          
          reader.readAsDataURL(blob);
        });
        
        // Wait for the base64 data and upload it
        const base64data = await base64Promise;
        console.log('Calling onImageSelected with base64 data');
        await onImageSelected(base64data);
        console.log('Image upload completed successfully');
        setIsLoading(false);
        
      } catch (err) {
        console.error('Error in fetch/blob/base64 conversion:', err);
        setIsLoading(false);
        Alert.alert('Error', 'Failed to process image data. Please try again.');
      }
    } catch (error) {
      console.error('Error in image manipulation:', error);
      setIsLoading(false);
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