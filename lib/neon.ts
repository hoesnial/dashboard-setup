import { neon } from '@neondatabase/serverless';

// Initialize Neon database connection with error handling
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const sql = neon(process.env.DATABASE_URL);

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
      console.log('Fetching products from Neon database...');
      const result = await sql`
        SELECT * FROM products 
        ORDER BY created_at DESC
      `;
      console.log(`Found ${result.length} products`);
      return result as Product[];
    } catch (error) {
      console.error('Neon database error (getProducts):', error);
      throw new Error(`Failed to fetch products: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Get product by ID
  async getProductById(id: string): Promise<Product | null> {
    try {
      console.log(`Fetching product with ID: ${id}`);
      const result = await sql`
        SELECT * FROM products 
        WHERE id = ${id}
      `;
      return result[0] as Product || null;
    } catch (error) {
      console.error('Neon database error (getProductById):', error);
      throw new Error(`Failed to fetch product: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
      console.log('Creating new product:', data);
      const result = await sql`
        INSERT INTO products (name, price, description, category)
        VALUES (${data.name}, ${data.price}, ${data.description}, ${data.category})
        RETURNING *
      `;
      console.log('Product created successfully');
      return result[0] as Product;
    } catch (error) {
      console.error('Neon database error (createProduct):', error);
      throw new Error(`Failed to create product: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
      console.log(`Updating product ${id}:`, data);
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
      
      console.log('Product updated successfully');
      return result[0] as Product;
    } catch (error) {
      console.error('Neon database error (updateProduct):', error);
      if (error instanceof Error && error.message === 'Product not found') {
        throw error;
      }
      throw new Error(`Failed to update product: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Delete product
  async deleteProduct(id: string): Promise<Product> {
    try {
      console.log(`Deleting product with ID: ${id}`);
      const result = await sql`
        DELETE FROM products 
        WHERE id = ${id}
        RETURNING *
      `;
      
      if (result.length === 0) {
        throw new Error('Product not found');
      }
      
      console.log('Product deleted successfully');
      return result[0] as Product;
    } catch (error) {
      console.error('Neon database error (deleteProduct):', error);
      if (error instanceof Error && error.message === 'Product not found') {
        throw error;
      }
      throw new Error(`Failed to delete product: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};