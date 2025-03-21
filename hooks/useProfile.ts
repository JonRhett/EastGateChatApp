import { useState, useEffect } from 'react';
import { Profile } from '@/types/profile';
import { profileService } from '@/services/supabase/profile';
import { useAuth } from './useAuth';

/**
 * Hook to fetch and manage the current user's profile
 */
export function useProfile() {
  const { user, session } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch profile when the user is available
  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      if (!user) {
        if (isMounted) {
          setProfile(null);
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);
        const profileData = await profileService.getCurrentProfile();
        
        if (isMounted) {
          setProfile(profileData);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch profile'));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [user]);

  // Function to update the profile
  const updateProfile = async (profileData: Partial<Profile>) => {
    if (!user) {
      throw new Error('No authenticated user');
    }

    setLoading(true);
    try {
      const updatedProfile = await profileService.updateProfile(profileData);
      setProfile(updatedProfile);
      setError(null);
      return updatedProfile;
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err instanceof Error ? err : new Error('Failed to update profile'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Function to upload avatar
  const uploadAvatar = async (base64Image: string, contentType?: string) => {
    if (!user) {
      throw new Error('No authenticated user');
    }

    setLoading(true);
    try {
      const avatarUrl = await profileService.uploadAvatar(base64Image, contentType);
      
      // Update local profile state with new avatar URL
      if (profile) {
        setProfile({
          ...profile,
          avatar_url: avatarUrl
        });
      }
      
      return avatarUrl;
    } catch (err) {
      console.error('Error uploading avatar:', err);
      setError(err instanceof Error ? err : new Error('Failed to upload avatar'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Function to delete avatar
  const deleteAvatar = async () => {
    if (!user) {
      throw new Error('No authenticated user');
    }

    setLoading(true);
    try {
      await profileService.deleteAvatar();
      
      // Update local profile state to remove avatar URL
      if (profile) {
        setProfile({
          ...profile,
          avatar_url: null
        });
      }
    } catch (err) {
      console.error('Error deleting avatar:', err);
      setError(err instanceof Error ? err : new Error('Failed to delete avatar'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
    uploadAvatar,
    deleteAvatar
  };
}