/*
  # Create search history table

  1. New Tables
    - `search_history`
      - `id` (uuid, primary key) - Unique identifier for each search record
      - `username` (text) - Minecraft username that was searched
      - `uuid` (text) - Player UUID from Hypixel
      - `searched_at` (timestamptz) - Timestamp when the search was made
      - `created_at` (timestamptz) - Record creation timestamp

  2. Security
    - Enable RLS on `search_history` table
    - Add policy for anyone to insert search history
    - Add policy for anyone to read recent searches

  3. Notes
    - This table stores recent player searches for quick access
    - No authentication required as it's public data
    - Records are automatically timestamped
*/

CREATE TABLE IF NOT EXISTS search_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text NOT NULL,
  uuid text NOT NULL,
  searched_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_search_history_username ON search_history(username);
CREATE INDEX IF NOT EXISTS idx_search_history_searched_at ON search_history(searched_at DESC);

ALTER TABLE search_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert search history"
  ON search_history
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view search history"
  ON search_history
  FOR SELECT
  USING (true);
