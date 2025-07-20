import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET() {
  try {
    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        success: false,
        message: 'DATABASE_URL environment variable is not set',
        error: 'Missing DATABASE_URL',
        instructions: [
          '1. Go to https://console.neon.tech',
          '2. Create a new project',
          '3. Copy the connection string',
          '4. Add it to your .env.local file as DATABASE_URL'
        ]
      }, { status: 500 });
    }

    // Test database connection
    const sql = neon(process.env.DATABASE_URL);
    
    // Simple query to test connection
    const result = await sql`SELECT NOW() as current_time, version() as postgres_version`;
    
    // Check if products table exists
    const tableCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'products'
      );
    `;

    return NextResponse.json({
      success: true,
      message: 'Database connection successful!',
      data: {
        connected: true,
        timestamp: result[0].current_time,
        postgres_version: result[0].postgres_version,
        products_table_exists: tableCheck[0].exists,
        database_url_configured: !!process.env.DATABASE_URL
      }
    });

  } catch (error) {
    console.error('Database connection test failed:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      troubleshooting: [
        'Check if your DATABASE_URL is correct',
        'Verify your Neon project is active',
        'Make sure your IP is not blocked',
        'Check if the database exists',
        'Verify SSL connection settings'
      ]
    }, { status: 500 });
  }
}