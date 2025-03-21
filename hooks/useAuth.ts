/**
 * Authentication hook for managing user authentication state.
 * Provides authentication status and methods for auth operations.
 */

import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase/client';
import { authService } from '../services/supabase/auth';
import { Session, User } from '@supabase/supabase-js';

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean | null>(null);

  // Check if email is verified
  const checkEmailVerification = async (userId: string) => {
    if (!userId) {
      setIsEmailVerified(false);
      return;
    }
    
    try {
      const verified = await authService.isEmailVerified(userId);
      setIsEmailVerified(verified);
    } catch (error) {
      console.error('Error checking email verification:', error);
      setIsEmailVerified(false);
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      if (currentUser) {
        checkEmailVerification(currentUser.id);
      } else {
        setIsEmailVerified(null);
      }
      
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      if (currentUser) {
        checkEmailVerification(currentUser.id);
      } else {
        setIsEmailVerified(null);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      setLoading(true);
      await authService.signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const resendVerificationEmail = async (email: string) => {
    try {
      setLoading(true);
      await authService.resendVerificationEmail(email);
      return true;
    } catch (error) {
      console.error('Error resending verification email:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    session,
    loading,
    isAuthenticated: !!session,
    isEmailVerified,
    user,
    signOut,
    resendVerificationEmail,
  };
} 