import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/neon';

// GET - Mengambil semua data products dari database Neon
export async function GET() {
  try {
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

    // Validasi price harus number
    if (typeof body.price !== 'number' || body.price <= 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Price must be a positive number' 
        },
        { status: 400 }
      );
    }

    const product = await db.createProduct({
      name: body.name,
      price: body.price,
      description: body.description || '',
      category: body.category || 'General',
    });

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product created successfully in Neon database'
    }, { status: 201 });

  } catch (error) {
    console.error('API error:', error);
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