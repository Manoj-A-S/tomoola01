import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type FolkDance = {
  id: string;
  name: string;
  description: string;
  history: string;
  image_url: string;
  video_url: string;
  images: string[];
  videos:string[];
  created_at: string;
};

export type Booking = {
  id?: string;
  folkdance_id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  event_date: string;
  event_type: string;
  event_location: string;
  message: string;
  status?: string;
};
