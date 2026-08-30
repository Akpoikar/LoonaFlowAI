import { NextRequest, NextResponse } from 'next/server';
import { getAuthHeaders } from '@/lib/auth';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

// POST /api/campaigns/[id]/upload-leads - Upload a CSV of leads for a campaign
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const headers = getAuthHeaders();

    if (!headers.Authorization) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Forward the incoming multipart form body as-is. getAuthHeaders() sets
    // Content-Type: application/json, which must be dropped here so fetch can
    // set its own multipart/form-data boundary for the FormData body.
    const { 'Content-Type': _contentType, ...forwardHeaders } = headers;
    const formData = await request.formData();

    const response = await fetch(`${BACKEND_URL}/api/campaigns/${id}/upload-leads`, {
      method: 'POST',
      headers: forwardHeaders,
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || data.error || 'Failed to upload leads' },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Upload leads error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
