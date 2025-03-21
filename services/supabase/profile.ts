import { supabase } from './client';
import { Profile, ProfileUpdateRequest } from '@/types/profile';
import { decode } from 'base64-arraybuffer';

/**
 * Service for handling user profile operations
 */
export const profileService = {
  /**
   * Get the current user's profile
   */
  async getCurrentProfile(): Promise<Profile | null> {
    const { data: session } = await supabase.auth.getSession();
    
    if (!session?.session?.user) {
      return null;
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.session.user.id)
      .single();
      
    if (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
    
    return data;
  },
  
  /**
   * Get a user profile by user ID
   */
  async getProfileById(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .rpc('get_user_profile', { user_id: userId });
      
    if (error) {
      console.error('Error fetching profile by ID:', error);
      throw error;
    }
    
    return data?.length ? data[0] : null;
  },
  
  /**
   * Update user profile information
   */
  async updateProfile(profileData: ProfileUpdateRequest): Promise<Profile> {
    const { data: session } = await supabase.auth.getSession();
    
    if (!session?.session?.user) {
      throw new Error('No authenticated user found');
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', session.session.user.id)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
    
    return data;
  },
  
  /**
   * Upload a profile avatar image
   */
  async uploadAvatar(
    base64Image: string, 
    contentType: string = 'image/jpeg'
  ): Promise<string> {
    const { data: session } = await supabase.auth.getSession();
    
    if (!session?.session?.user) {
      throw new Error('No authenticated user found');
    }
    
    const userId = session.session.user.id;
    const filePath = `${userId}/avatar`;
    
    // Remove data URL prefix if present (e.g., "data:image/jpeg;base64,")
    const base64Data = base64Image.includes('base64,') 
      ? base64Image.split('base64,')[1] 
      : base64Image;
    
    // Convert base64 to ArrayBuffer
    const arrayBuffer = decode(base64Data);
    
    // Upload the image
    const { data, error } = await supabase.storage
      .from('profile_images')
      .upload(filePath, arrayBuffer, {
        contentType,
        upsert: true
      });
      
    if (error) {
      console.error('Error uploading avatar:', error);
      throw error;
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('profile_images')
      .getPublicUrl(filePath);
      
    // Update profile with new avatar URL
    await this.updateProfile({ avatar_url: publicUrl });
    
    return publicUrl;
  },
  
  /**
   * Delete the user's avatar
   */
  async deleteAvatar(): Promise<void> {
    const { data: session } = await supabase.auth.getSession();
    
    if (!session?.session?.user) {
      throw new Error('No authenticated user found');
    }
    
    const userId = session.session.user.id;
    const filePath = `${userId}/avatar`;
    
    // Delete the avatar file
    const { error: deleteError } = await supabase.storage
      .from('profile_images')
      .remove([filePath]);
      
    if (deleteError) {
      console.error('Error deleting avatar:', deleteError);
      throw deleteError;
    }
    
    // Update profile to remove avatar URL
    await this.updateProfile({ avatar_url: null });
  }
};

export default profileService;