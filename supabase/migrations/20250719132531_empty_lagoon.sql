-- Neon PostgreSQL Database Schema
-- Run this SQL in your Neon database console

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price NUMERIC NOT NULL CHECK (price > 0),
  description TEXT DEFAULT '',
  category TEXT DEFAULT 'General',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
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
  ('Mobile App Builder', 1199000, 'No-code platform to build beautiful mobile applications for iOS and Android.', 'Development')
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);