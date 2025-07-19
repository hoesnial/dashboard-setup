import { neon } from '@neondatabase/serverless';

// Initialize Neon database connection
const sql = neon(process.env.DATABASE_URL!);

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  created_at: string;
  updated_at: string;
};

// Database operations
export const db = {
  // Get all products
  async getProducts(): Promise<Product[]> {
    try {
      const result = await sql`
        SELECT * FROM products 
        ORDER BY created_at DESC
      `;
      return result as Product[];
    } catch (error) {
      console.error('Database error:', error);
      throw new Error('Failed to fetch products');
    }
  },

  // Get product by ID
  async getProductById(id: string): Promise<Product | null> {
    try {
      const result = await sql`
        SELECT * FROM products 
        WHERE id = ${id}
      `;
      return result[0] as Product || null;
    } catch (error) {
      console.error('Database error:', error);
      throw new Error('Failed to fetch product');
    }
  },

  // Create new product
  async createProduct(data: {
    name: string;
    price: number;
    description: string;
    category: string;
  }): Promise<Product> {
    try {
      const result = await sql`
        INSERT INTO products (name, price, description, category)
        VALUES (${data.name}, ${data.price}, ${data.description}, ${data.category})
        RETURNING *
      `;
      return result[0] as Product;
    } catch (error) {
      console.error('Database error:', error);
      throw new Error('Failed to create product');
    }
  },

  // Update product
  async updateProduct(id: string, data: {
    name: string;
    price: number;
    description: string;
    category: string;
  }): Promise<Product> {
    try {
      const result = await sql`
        UPDATE products 
        SET 
          name = ${data.name},
          price = ${data.price},
          description = ${data.description},
          category = ${data.category},
          updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `;
      
      if (result.length === 0) {
        throw new Error('Product not found');
      }
      
      return result[0] as Product;
    } catch (error) {
      console.error('Database error:', error);
      throw new Error('Failed to update product');
    }
  },

  // Delete product
  async deleteProduct(id: string): Promise<Product> {
    try {
      const result = await sql`
        DELETE FROM products 
        WHERE id = ${id}
        RETURNING *
      `;
      
      if (result.length === 0) {
        throw new Error('Product not found');
      }
      
      return result[0] as Product;
    } catch (error) {
      console.error('Database error:', error);
      throw new Error('Failed to delete product');
    }
  }
};