import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET - Mengambil data product berdasarkan ID dari database
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Product not found' 
          },
          { status: 404 }
        );
      }
      
      console.error('Supabase error:', error);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to retrieve product from database',
          error: error.message
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product retrieved successfully'
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

// PUT - Mengupdate data product di database
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

    const { data: product, error } = await supabase
      .from('products')
      .update({
        name: body.name,
        price: body.price,
        description: body.description || '',
        category: body.category || 'General',
      })
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Product not found' 
          },
          { status: 404 }
        );
      }
      
      console.error('Supabase error:', error);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to update product in database',
          error: error.message
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product updated successfully'
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

// DELETE - Menghapus data product dari database
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data: product, error } = await supabase
      .from('products')
      .delete()
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Product not found' 
          },
          { status: 404 }
        );
      }
      
      console.error('Supabase error:', error);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to delete product from database',
          error: error.message
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product deleted successfully'
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