import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET - Mengambil semua data products dari database
export async function GET() {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to retrieve products from database',
          error: error.message
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: products || [],
      message: 'Products retrieved successfully'
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST - Menambahkan data baru ke database
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

    const { data: product, error } = await supabase
      .from('products')
      .insert([
        {
          name: body.name,
          price: body.price,
          description: body.description || '',
          category: body.category || 'General',
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to create product in database',
          error: error.message
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}