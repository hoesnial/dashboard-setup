import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/neon';

// GET - Mengambil semua data products dari database Neon
export async function GET() {
  try {
    // Check database connection
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Database connection not configured. Please set DATABASE_URL environment variable.',
          error: 'Missing DATABASE_URL'
        },
        { status: 500 }
      );
    }

    const products = await db.getProducts();

    return NextResponse.json({
      success: true,
      data: products,
      message: 'Products retrieved successfully from Neon database'
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to retrieve products from database',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST - Menambahkan data baru ke database Neon
export async function POST(request: NextRequest) {
  try {
    // Check database connection
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Database connection not configured. Please set DATABASE_URL environment variable.',
          error: 'Missing DATABASE_URL'
        },
        { status: 500 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid JSON in request body' 
        },
        { status: 400 }
      );
    }
    
    console.log('Received request body:', body);
    const body = await request.json();
    
    // Validasi input
    if (!body.name || !body.price) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Name and price are required' 
        },
        { status: 400 }
      );
    }

    // Convert price to number if it's a string
    const price = typeof body.price === 'string' ? parseFloat(body.price) : body.price;
    
    // Validasi price harus number
    if (isNaN(price) || price <= 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Price must be a positive number' 
        },
        { status: 400 }
      );
    }

    console.log('Creating product with data:', {
      name: body.name,
      price: price,
      description: body.description || '',
      category: body.category || 'General'
    });

    const product = await db.createProduct({
      name: body.name,
      price: price,
      description: body.description || '',
      category: body.category || 'General',
    });

    console.log('Product created successfully:', product);

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product created successfully in Neon database'
    }, { status: 201 });

  } catch (error) {
    console.error('API error:', error);
    
    // Handle specific database errors
    if (error instanceof Error) {
      if (error.message.includes('relation "products" does not exist')) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Database table not found. Please run the database schema first.',
            error: error.message,
            instructions: [
              '1. Go to Neon Console SQL Editor',
              '2. Run the schema from neon/schema.sql file',
              '3. Try creating the product again'
            ]
          },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to create product in database',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}