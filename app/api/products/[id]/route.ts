// Static data storage (shared with main route)
let products = [
  {
    id: 1,
    name: 'Dashboard Pro',
    price: 1499000,
    description: 'Advanced analytics dashboard with real-time data visualization and custom reporting.',
    category: 'Analytics',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Security Suite',
    price: 2199000,
    description: 'Comprehensive security solution with advanced threat detection and prevention.',
    category: 'Security',
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Mobile App Builder',
    price: 1199000,
    description: 'No-code platform to build beautiful mobile applications for iOS and Android.',
    category: 'Development',
    createdAt: new Date().toISOString(),
  },
];

// GET - Mengambil data product berdasarkan ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
      return Response.json(
        { 
          success: false, 
          message: 'Product not found' 
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: product,
      message: 'Product retrieved successfully'
    });

  } catch (error) {
    return Response.json(
      { 
        success: false, 
        message: 'Failed to retrieve product',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// PUT - Mengupdate data product
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      return Response.json(
        { 
          success: false, 
          message: 'Product not found' 
        },
        { status: 404 }
      );
    }

    // Validasi input
    if (!body.name || !body.price) {
      return Response.json(
        { 
          success: false, 
          message: 'Name and price are required' 
        },
        { status: 400 }
      );
    }

    // Validasi price harus number
    if (typeof body.price !== 'number' || body.price <= 0) {
      return Response.json(
        { 
          success: false, 
          message: 'Price must be a positive number' 
        },
        { status: 400 }
      );
    }

    // Update product
    products[productIndex] = {
      ...products[productIndex],
      name: body.name,
      price: body.price,
      description: body.description || products[productIndex].description,
      category: body.category || products[productIndex].category,
      updatedAt: new Date().toISOString(),
    };

    return Response.json({
      success: true,
      data: products[productIndex],
      message: 'Product updated successfully'
    });

  } catch (error) {
    return Response.json(
      { 
        success: false, 
        message: 'Failed to update product',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// DELETE - Menghapus data product
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      return Response.json(
        { 
          success: false, 
          message: 'Product not found' 
        },
        { status: 404 }
      );
    }

    const deletedProduct = products[productIndex];
    products.splice(productIndex, 1);

    return Response.json({
      success: true,
      data: deletedProduct,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    return Response.json(
      { 
        success: false, 
        message: 'Failed to delete product',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}