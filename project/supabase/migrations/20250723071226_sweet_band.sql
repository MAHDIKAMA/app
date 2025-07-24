/*
  # Disable email confirmation requirement

  This migration ensures that users can sign up and sign in immediately without email confirmation.
  The RLS policies are also updated to work correctly with the auth system.

  1. Security
    - Update RLS policies to use correct auth.uid() function
    - Ensure policies work for immediate sign-in after signup

  2. Changes
    - Drop and recreate RLS policies with correct syntax
    - Ensure user_profiles table works with immediate authentication
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;

-- Create new policies with correct auth.uid() function
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