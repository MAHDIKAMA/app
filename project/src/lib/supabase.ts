import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserProfile = {
  id: string;
  full_name: string;
  date_of_birth?: string;
  education_level?: string;
  interests?: string[];
  phone?: string;
  city?: string;
  created_at: string;
  updated_at: string;
};