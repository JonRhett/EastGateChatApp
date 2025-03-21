import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';

// Check that environment variables are set
// Using default values in development if env values aren't available
const supabaseUrl = SUPABASE_URL || 'https://lzbiekeglutjyfvfxnnc.supabase.co';
const supabaseAnonKey = SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6Ymlla2VnbHV0anlmdmZ4bm5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0OTAwMzUsImV4cCI6MjA1ODA2NjAzNX0.1jNdpThA6eZQH8cyr8fqI82GFZmYtswLBIJYJUhelBcFFFF';

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});

export default supabase; 