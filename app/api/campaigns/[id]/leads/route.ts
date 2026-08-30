import { NextRequest, NextResponse } from 'next/server';
import { getAuthHeaders } from '@/lib/auth';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

// GET /api/campaigns/[id]/leads - Get the scraped leads for a campaign, with skipped row indices
export async function GET(
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

    const response = await fetch(`${BACKEND_URL}/api/campaigns/${id}/leads`, {
      method: 'GET',
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Failed to fetch leads' },
        { status: response.status }
      );
    }

    // Backend response format is flat: { success: true, totalRows, skippedRowIndices, leads }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Get campaign leads error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
