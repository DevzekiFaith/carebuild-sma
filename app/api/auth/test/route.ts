import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { 
      success: true, 
      message: 'API route is working correctly',
      timestamp: new Date().toISOString()
    },
    { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json(
      { 
        success: true, 
        message: 'POST request received',
        data: body,
        timestamp: new Date().toISOString()
      },
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Invalid request body' 
      },
      { 
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }
}



