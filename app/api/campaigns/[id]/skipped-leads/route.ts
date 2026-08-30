import { NextRequest, NextResponse } from 'next/server';
import { getAuthHeaders } from '@/lib/auth';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

// PUT /api/campaigns/[id]/skipped-leads - Save which lead rows are skipped (unchecked) for a campaign
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { skippedRowIndices } = body;

    if (!Array.isArray(skippedRowIndices)) {
      return NextResponse.json(
        { error: 'skippedRowIndices must be an array of row indices' },
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

    const response = await fetch(`${BACKEND_URL}/api/campaigns/${id}/skipped-leads`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ skippedRowIndices }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Failed to save skipped leads' },
        { status: response.status }
      );
    }

    // Handle backend response format: { success: true, data: { skippedRowIndices: [...] } }
    return NextResponse.json(data.data || data, { status: 200 });
  } catch (error) {
    console.error('Save skipped leads error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
