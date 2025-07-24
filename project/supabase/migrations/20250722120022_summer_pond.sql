/*
  # Add INSERT policy for user_profiles table

  1. Security
    - Add policy for authenticated users to insert their own profile data
    - This allows users to create their profile after successful registration

  This fixes the RLS policy violation error that was preventing user registration.
*/

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);