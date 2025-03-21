# Manual Migration Guide for EastGate Church App

This guide will help you apply database migrations manually if you don't have the Supabase CLI installed.

## Prerequisites

1. Access to your Supabase project
2. Admin access to the SQL editor

## Steps to Apply Migration

1. Log in to your Supabase project at [https://app.supabase.com](https://app.supabase.com)
2. Navigate to the SQL Editor section
3. Create a new query
4. Copy and paste the contents of the migration file from:
   `/supabase/migrations/20250322000000_user_profiles_schema.sql`
5. Run the query

## Verifying the Migration

After applying the migration, you can verify it was successful by:

1. Going to the "Table Editor" section
2. You should see a new "profiles" table in the "public" schema
3. Check storage buckets to verify "profile_images" bucket was created
4. You can test creating a new user to ensure the profile is automatically created

## Troubleshooting

If you encounter any errors:

1. Check that the migration hasn't already been applied
2. Verify you have the necessary permissions
3. Check for any syntax errors in the SQL
4. Contact the development team if you continue to have issues

## Rolling Back

If you need to roll back this migration:

```sql
-- Drop the profile table
DROP TABLE IF EXISTS "public"."profiles";

-- Remove the storage bucket for profile images
DELETE FROM storage.buckets WHERE id = 'profile_images';

-- Drop the function
DROP FUNCTION IF EXISTS "public"."get_user_profile";
DROP FUNCTION IF EXISTS "public"."handle_updated_at";
```