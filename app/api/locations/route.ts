import { NextRequest, NextResponse } from 'next/server';
import { getAuthHeaders } from '@/lib/auth';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export const dynamic = 'force-dynamic';

// GET /api/locations?country=${country} - Get all locations for a specific country
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country');

    console.log('Locations API called with country:', country);

    if (!country) {
      return NextResponse.json(
        { error: 'Country parameter is required' },
        { status: 400 }
      );
    }

    const headers = getAuthHeaders();
    
    console.log('Auth headers:', { hasAuth: !!headers.Authorization, headers });
    
    if (!headers.Authorization) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const backendUrl = `${BACKEND_URL}/api/locations?country=${country}`;
    console.log('Calling backend:', backendUrl);
    
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers,
    });

    console.log('Backend response status:', response.status);
    const data = await response.json();
    console.log('Backend response data:', data);

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Failed to fetch locations' },
        { status: response.status }
      );
    }

    // Handle backend response format: { success: true, data: [...] }
    return NextResponse.json(data.data || data, { status: 200 });
  } catch (error) {
    console.error('Get locations error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
