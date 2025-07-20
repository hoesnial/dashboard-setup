@@ .. @@
 /*
   # Create products table for Neon PostgreSQL

   1. New Tables
     - `products`
       - `id` (uuid, primary key, auto-generated)
       - `name` (text, required)
       - `price` (numeric, required, must be positive)
       - `description` (text, optional)
       - `category` (text, default 'General')
       - `created_at` (timestamptz, auto-generated)
       - `updated_at` (timestamptz, auto-updated)

   2. Constraints
     - Price must be greater than 0
     - Name cannot be empty

   3. Indexes
     - Primary key on id
     - Index on category for faster filtering
     - Index on created_at for sorting

   4. Sample Data
     - 3 sample products for testing
 */

+-- Drop table if exists (for clean setup)
+DROP TABLE IF EXISTS products;
+
 -- Create products table
 CREATE TABLE products (
   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
   name TEXT NOT NULL CHECK (length(trim(name)) > 0),
   price NUMERIC NOT NULL CHECK (price > 0),
   description TEXT DEFAULT '',
   category TEXT DEFAULT 'General',
   created_at TIMESTAMPTZ DEFAULT NOW(),
   updated_at TIMESTAMPTZ DEFAULT NOW()
 );

 -- Create indexes for better performance
 CREATE INDEX idx_products_category ON products(category);
 CREATE INDEX idx_products_created_at ON products(created_at DESC);
+CREATE INDEX idx_products_name ON products(name);

 -- Create trigger to automatically update updated_at
 CREATE OR REPLACE FUNCTION update_updated_at_column()
 RETURNS TRIGGER AS $$
 BEGIN
     NEW.updated_at = NOW();
     RETURN NEW;
 END;
 $$ language 'plpgsql';

 CREATE TRIGGER update_products_updated_at 
     BEFORE UPDATE ON products 
     FOR EACH ROW 
     EXECUTE FUNCTION update_updated_at_column();

 -- Insert sample data
 INSERT INTO products (name, price, description, category) VALUES
   ('Dashboard Pro', 1499000, 'Advanced analytics dashboard with real-time data visualization and custom reporting.', 'Analytics'),
   ('Security Suite', 2199000, 'Comprehensive security solution with advanced threat detection and prevention.', 'Security'),
   ('Mobile App Builder', 1199000, 'No-code platform to build beautiful mobile applications for iOS and Android.', 'Development');

+-- Verify table creation
+SELECT 'Products table created successfully' as status;
+SELECT COUNT(*) as sample_data_count FROM products;