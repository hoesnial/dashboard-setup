import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/neon';

// GET - Mengambil data product berdasarkan ID dari database Neon
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await db.getProductById(params.id);

    if (!product) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Product not found' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product retrieved successfully from Neon database'
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to retrieve product from database',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// PUT - Mengupdate data product di database Neon
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const product = await db.updateProduct(params.id, {
      name: body.name,
      price: body.price,
      description: body.description || '',
      category: body.category || 'General',
    });

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product updated successfully in Neon database'
    });

  } catch (error) {
    console.error('API error:', error);
    
    if (error instanceof Error && error.message === 'Product not found') {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Product not found' 
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to update product in database',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// DELETE - Menghapus data product dari database Neon
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await db.deleteProduct(params.id);

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product deleted successfully from Neon database'
    });

  } catch (error) {
    console.error('API error:', error);
    
    if (error instanceof Error && error.message === 'Product not found') {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Product not found' 
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to delete product from database',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}