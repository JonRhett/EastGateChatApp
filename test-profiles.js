import { profileService } from './services/supabase/profile';

// Create a test to see if the profiles table exists
async function testProfilesTable() {
  try {
    // Try to get the current profile (will fail if table doesn't exist)
    const profile = await profileService.getCurrentProfile();
    console.log('Profiles table exists, current profile:', profile);
    return true;
  } catch (error) {
    console.error('Error accessing profiles table:', error);
    return false;
  }
}

testProfilesTable();
