/*
  # Create products table

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `price` (numeric, not null)
      - `description` (text)
      - `category` (text, default 'General')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `products` table
    - Add policy for public access (for demo purposes)
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric NOT NULL CHECK (price > 0),
  description text DEFAULT '',
  category text DEFAULT 'General',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (for demo purposes)
-- In production, you would want more restrictive policies
CREATE POLICY "Allow public access to products"
  ON products
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO products (name, price, description, category) VALUES
  ('Dashboard Pro', 1499000, 'Advanced analytics dashboard with real-time data visualization and custom reporting.', 'Analytics'),
  ('Security Suite', 2199000, 'Comprehensive security solution with advanced threat detection and prevention.', 'Security'),
  ('Mobile App Builder', 1199000, 'No-code platform to build beautiful mobile applications for iOS and Android.', 'Development');