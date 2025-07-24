/*
  # Fix RLS policies for user_profiles table

  1. Security Updates
    - Drop existing policies that use incorrect uid() function
    - Create new policies using correct auth.uid() function
    - Ensure proper INSERT, SELECT, and UPDATE permissions for authenticated users

  This fixes the RLS policy violation error by using the correct Supabase auth function.
*/

-- Drop existing policies with incorrect function names
DROP POLICY IF EXISTS "Users can create own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;

-- Create correct policies using auth.uid()
CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);