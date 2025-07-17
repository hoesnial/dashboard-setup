// Static data storage (will reset on server restart)
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

let nextId = 4;

// GET - Mengambil semua data products
export async function GET() {
  try {
    return Response.json({
      success: true,
      data: products,
      message: 'Products retrieved successfully'
    });
  } catch (error) {
    return Response.json(
      { 
        success: false, 
        message: 'Failed to retrieve products',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST - Menambahkan data baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
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

    const newProduct = {
      id: nextId++,
      name: body.name,
      price: body.price,
      description: body.description || '',
      category: body.category || 'General',
      createdAt: new Date().toISOString(),
    };

    products.push(newProduct);

    return Response.json({
      success: true,
      data: newProduct,
      message: 'Product created successfully'
    }, { status: 201 });

  } catch (error) {
    return Response.json(
      { 
        success: false, 
        message: 'Failed to create product',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}