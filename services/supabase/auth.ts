import { supabase } from './client';
import { SignUpData, LoginCredentials, ValidationResult } from '../../types/auth';
import { Profile } from '../../types/profile';

/**
 * Email validation regex pattern
 * Validates common email format patterns
 */
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Password validation requirements
 * - At least 8 characters long
 * - Contains at least one uppercase letter
 * - Contains at least one lowercase letter
 * - Contains at least one number
 */
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_UPPERCASE_REGEX = /[A-Z]/;
const PASSWORD_LOWERCASE_REGEX = /[a-z]/;
const PASSWORD_NUMBER_REGEX = /[0-9]/;

export const authService = {
  /**
   * Validate email format
   */
  validateEmail(email: string): ValidationResult {
    if (!email || email.trim() === '') {
      return { valid: false, message: 'Email is required' };
    }
    
    if (!EMAIL_REGEX.test(email)) {
      return { valid: false, message: 'Please enter a valid email address' };
    }
    
    return { valid: true };
  },
  
  /**
   * Validate password strength
   */
  validatePassword(password: string): ValidationResult {
    if (!password) {
      return { valid: false, message: 'Password is required' };
    }
    
    if (password.length < PASSWORD_MIN_LENGTH) {
      return { 
        valid: false, 
        message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long` 
      };
    }
    
    if (!PASSWORD_UPPERCASE_REGEX.test(password)) {
      return { 
        valid: false, 
        message: 'Password must contain at least one uppercase letter' 
      };
    }
    
    if (!PASSWORD_LOWERCASE_REGEX.test(password)) {
      return { 
        valid: false, 
        message: 'Password must contain at least one lowercase letter' 
      };
    }
    
    if (!PASSWORD_NUMBER_REGEX.test(password)) {
      return { 
        valid: false, 
        message: 'Password must contain at least one number' 
      };
    }
    
    return { valid: true };
  },
  
  /**
   * Sign in with email and password
   */
  async signIn(email: string, password: string) {
    // Validate email format first
    const emailValidation = this.validateEmail(email);
    if (!emailValidation.valid) {
      throw new Error(emailValidation.message);
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  /**
   * Sign up with email and password
   * @returns An object containing user and session data
   */
  async signUp(email: string, password: string): Promise<{ user: any; session: any | null }> {
    // Validate email format
    const emailValidation = this.validateEmail(email);
    if (!emailValidation.valid) {
      throw new Error(emailValidation.message);
    }
    
    // Validate password strength
    const passwordValidation = this.validatePassword(password);
    if (!passwordValidation.valid) {
      throw new Error(passwordValidation.message);
    }
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'eastgatechurchapp://login',
        data: {
          email_verified: false
        }
      },
    });
    if (error) throw error;
    return data;
  },

  /**
   * Sign out current user
   */
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /**
   * Send password reset email
   */
  async resetPassword(email: string) {
    // Validate email format first
    const emailValidation = this.validateEmail(email);
    if (!emailValidation.valid) {
      throw new Error(emailValidation.message);
    }
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'eastgatechurchapp://reset-password',
    });
    if (error) throw error;
  },
  
  /**
   * Check if a user's email has been verified
   */
  async isEmailVerified(userId: string): Promise<boolean> {
    try {
      // First try to use the user's own session data
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) throw error;
      if (!user) return false;
      
      // Supabase auth.user contains email_confirmed_at
      return user.email_confirmed_at !== null;
    } catch (error) {
      console.error('Error checking email verification:', error);
      return false;
    }
  },
  
  /**
   * Resend email verification link
   */
  async resendVerificationEmail(email: string): Promise<void> {
    const emailValidation = this.validateEmail(email);
    if (!emailValidation.valid) {
      throw new Error(emailValidation.message);
    }
    
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: 'eastgatechurchapp://login',
      }
    });
    
    if (error) throw error;
  },

  /**
   * Update user password
   */
  async updatePassword(password: string) {
    const { error } = await supabase.auth.updateUser({
      password,
    });
    if (error) throw error;
  },

  /**
   * Get current user profile data
   */
  async getUserProfile(userId: string): Promise<Profile> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update user profile data
   */
  async updateUserProfile(userId: string, profileData: Partial<Profile>): Promise<Profile> {
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
}; 