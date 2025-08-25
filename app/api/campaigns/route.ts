import { NextRequest, NextResponse } from 'next/server';
import { getAuthHeaders } from '@/lib/auth';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

// GET /api/campaigns - Get all campaigns for the authenticated user
export async function GET(request: NextRequest) {
  try {
    const headers = getAuthHeaders();
    
    if (!headers.Authorization) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const response = await fetch(`${BACKEND_URL}/api/campaigns`, {
      method: 'GET',
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Failed to fetch campaigns' },
        { status: response.status }
      );
    }

    // Handle backend response format: { success: true, data: [...] }
    return NextResponse.json(data.data || data, { status: 200 });
  } catch (error) {
    console.error('Get campaigns error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/campaigns - Create a new campaign
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { businessType, location, maximumResults, emailsPerDay, emailTemplate } = body;

    if (!businessType || !location || !emailTemplate) {
      return NextResponse.json(
        { error: 'Business type, location, and email template are required' },
        { status: 400 }
      );
    }

    const headers = getAuthHeaders();
    
    if (!headers.Authorization) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const response = await fetch(`${BACKEND_URL}/api/campaigns`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        businessType,
        location,
        maximumResults,
        emailTemplate,
        emailsPerDay,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Failed to create campaign' },
        { status: response.status }
      );
    }

    // Handle backend response format: { success: true, data: {...} }
    return NextResponse.json(data.data || data, { status: 201 });
  } catch (error) {
    console.error('Create campaign error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
