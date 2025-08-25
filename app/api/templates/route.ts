import { NextRequest, NextResponse } from 'next/server';
import { getAuthHeaders } from '@/lib/auth';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

// GET /api/templates - Get all email templates for the authenticated user
export async function GET(request: NextRequest) {
  try {
    const headers = getAuthHeaders();
    
    if (!headers.Authorization) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const response = await fetch(`${BACKEND_URL}/api/templates`, {
      method: 'GET',
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Failed to fetch templates' },
        { status: response.status }
      );
    }

    // Handle backend response format: { success: true, data: [...] }
    const responseData = data.data || data;
    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/templates - Create a new email template
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subject, content } = body;

    if (!subject || !content) {
      return NextResponse.json(
        { error: 'Subject and content are required' },
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

    const response = await fetch(`${BACKEND_URL}/api/templates`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        subject,
        content,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Failed to create template' },
        { status: response.status }
      );
    }

    // Handle backend response format: { success: true, data: {...} }
    return NextResponse.json(data.data || data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
