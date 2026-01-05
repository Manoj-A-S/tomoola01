/*
  # ToMoola Platform Database Schema

  ## Overview
  Complete database schema for ToMoola - Indian folk dance booking platform

  ## New Tables

  ### 1. `indian_states`
  - `id` (uuid, primary key)
  - `name` (text, unique) - State name
  - `description` (text) - Brief description
  - `created_at` (timestamptz)

  ### 2. `folk_dances`
  - `id` (uuid, primary key)
  - `name` (text) - Dance name
  - `state_id` (uuid, foreign key to indian_states)
  - `description` (text) - Dance description
  - `history` (text) - Historical background
  - `image_url` (text) - Main image
  - `video_url` (text) - Featured video
  - `created_at` (timestamptz)

  ### 3. `artists`
  - `id` (uuid, primary key)
  - `name` (text) - Artist/Group name
  - `type` (text) - 'solo' or 'group'
  - `state_id` (uuid, foreign key to indian_states)
  - `folk_dance_id` (uuid, foreign key to folk_dances)
  - `bio` (text) - Artist biography
  - `experience_years` (integer)
  - `profile_image` (text) - Profile photo URL
  - `price_range_min` (integer) - Minimum price
  - `price_range_max` (integer) - Maximum price
  - `rating` (numeric) - Average rating
  - `total_reviews` (integer)
  - `is_verified` (boolean)
  - `created_at` (timestamptz)

  ### 4. `artist_media`
  - `id` (uuid, primary key)
  - `artist_id` (uuid, foreign key to artists)
  - `type` (text) - 'photo' or 'video'
  - `url` (text) - Media URL
  - `caption` (text)
  - `created_at` (timestamptz)

  ### 5. `reviews`
  - `id` (uuid, primary key)
  - `artist_id` (uuid, foreign key to artists)
  - `client_name` (text)
  - `rating` (integer) - 1-5 stars
  - `comment` (text)
  - `event_type` (text) - Wedding, Corporate, etc.
  - `created_at` (timestamptz)

  ### 6. `bookings`
  - `id` (uuid, primary key)
  - `artist_id` (uuid, foreign key to artists)
  - `client_name` (text)
  - `client_email` (text)
  - `client_phone` (text)
  - `event_date` (date)
  - `event_type` (text)
  - `event_location` (text)
  - `expected_guests` (integer)
  - `message` (text)
  - `status` (text) - 'pending', 'confirmed', 'cancelled'
  - `created_at` (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Public read access for browsing
  - Restricted write access for bookings
*/

-- Create folk_dances table
CREATE TABLE IF NOT EXISTS folk_dances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  history text,
  image_url text,
  video_url text,
  created_at timestamptz DEFAULT now()
);

-- Create artists table
CREATE TABLE IF NOT EXISTS artists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text DEFAULT 'group',
  folk_dance_id uuid REFERENCES folk_dances(id) ON DELETE SET NULL,
  bio text,
  experience_years integer DEFAULT 0,
  profile_image text,
  price_range_min integer DEFAULT 0,
  price_range_max integer DEFAULT 0,
  rating numeric DEFAULT 0,
  total_reviews integer DEFAULT 0,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create artist_media table
CREATE TABLE IF NOT EXISTS artist_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id uuid REFERENCES artists(id) ON DELETE CASCADE,
  type text NOT NULL,
  url text NOT NULL,
  caption text,
  created_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id uuid REFERENCES artists(id) ON DELETE CASCADE,
  client_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  event_type text,
  created_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id uuid REFERENCES artists(id) ON DELETE SET NULL,
  client_name text NOT NULL,
  client_email text NOT NULL,
  client_phone text NOT NULL,
  event_date date NOT NULL,
  event_type text NOT NULL,
  event_location text NOT NULL,
  expected_guests integer,
  message text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE folk_dances ENABLE ROW LEVEL SECURITY;
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE artist_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public read access
CREATE POLICY "Anyone can view folk dances"
  ON folk_dances FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can view artists"
  ON artists FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can view artist media"
  ON artist_media FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT
  TO public
  USING (true);

-- Bookings: Allow anyone to create bookings
CREATE POLICY "Anyone can create bookings"
  ON bookings FOR INSERT
  TO public
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_artists_folk_dance ON artists(folk_dance_id);
CREATE INDEX IF NOT EXISTS idx_artist_media_artist ON artist_media(artist_id);
CREATE INDEX IF NOT EXISTS idx_reviews_artist ON reviews(artist_id);
CREATE INDEX IF NOT EXISTS idx_bookings_artist ON bookings(artist_id);
