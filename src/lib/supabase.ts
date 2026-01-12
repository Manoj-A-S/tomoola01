import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Artist = {
  id: string;
  name: string;
  type: string;
  state_id: string;
  folk_dance_id: string;
  bio: string;
  experience_years: number;
  profile_image: string;
  price_range_min: number;
  price_range_max: number;
  rating: number;
  total_reviews: number;
  is_verified: boolean;
  created_at: string;
};

export type FolkDance = {
  id: string;
  name: string;
  state_id: string;
  description: string;
  history: string;
  image_url: string;
  video_url: string;
  images: string[];
  videos:string[];
  created_at: string;
};

export type Review = {
  id: string;
  artist_id: string;
  client_name: string;
  rating: number;
  comment: string;
  event_type: string;
  created_at: string;
};

export type Booking = {
  id?: string;
  artist_id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  event_date: string;
  event_type: string;
  event_location: string;
  expected_guests: number;
  message: string;
  status?: string;
};
