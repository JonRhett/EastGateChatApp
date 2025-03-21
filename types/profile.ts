export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  avatar_url: string | null;
  phone: string | null;
  address: string | null;
  ministry_roles: string[] | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProfileUpdateRequest {
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar_url?: string;
  phone?: string;
  address?: string;
  ministry_roles?: string[];
  bio?: string;
}