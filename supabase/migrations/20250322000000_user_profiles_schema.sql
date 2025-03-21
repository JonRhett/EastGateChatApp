-- Create the profiles table for user profile information
CREATE TABLE IF NOT EXISTS "public"."profiles" (
  "id" UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  "first_name" VARCHAR(100),
  "last_name" VARCHAR(100),
  "email" VARCHAR(255),
  "avatar_url" VARCHAR(255),
  "phone" VARCHAR(20),
  "address" VARCHAR(255),
  "ministry_roles" TEXT[],
  "bio" TEXT,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create RLS policies for profiles table
ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own profile
CREATE POLICY "Users can view their own profile" 
  ON "public"."profiles" FOR SELECT 
  USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile" 
  ON "public"."profiles" FOR UPDATE 
  USING (auth.uid() = id);

-- Allow service role to manage all profiles
CREATE POLICY "Service role can do all" 
  ON "public"."profiles" FOR ALL 
  USING (auth.role() = 'service_role');

-- Create profile update trigger to manage updated_at
CREATE OR REPLACE FUNCTION "public"."handle_updated_at"()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "set_profiles_updated_at"
BEFORE UPDATE ON "public"."profiles"
FOR EACH ROW
EXECUTE FUNCTION "public"."handle_updated_at"();

-- Create storage bucket for profile images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('profile_images', 'profile_images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to profile images
CREATE POLICY "Public read access for profile images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'profile_images');

-- Allow authenticated users to upload their own profile images
CREATE POLICY "Users can upload their own profile images"
  ON storage.objects FOR INSERT 
  WITH CHECK (
    bucket_id = 'profile_images' AND 
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Allow users to update their own profile images
CREATE POLICY "Users can update their own profile images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'profile_images' AND 
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Allow users to delete their own profile images
CREATE POLICY "Users can delete their own profile images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'profile_images' AND 
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Create custom function to get user profile with avatar URL
CREATE OR REPLACE FUNCTION get_user_profile(user_id UUID)
RETURNS TABLE (
  id UUID,
  first_name VARCHAR,
  last_name VARCHAR,
  email VARCHAR,
  avatar_url VARCHAR,
  phone VARCHAR,
  address VARCHAR,
  ministry_roles TEXT[],
  bio TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.first_name,
    p.last_name,
    p.email,
    p.avatar_url,
    p.phone,
    p.address,
    p.ministry_roles,
    p.bio,
    p.created_at,
    p.updated_at
  FROM profiles p
  WHERE p.id = user_id;
END;
$$ LANGUAGE plpgsql;

-- Allow public access to the function
GRANT EXECUTE ON FUNCTION get_user_profile(UUID) TO PUBLIC;

-- Create a trigger to create a profile when a new user is created
CREATE OR REPLACE FUNCTION create_profile_for_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger on auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_profile_for_new_user();