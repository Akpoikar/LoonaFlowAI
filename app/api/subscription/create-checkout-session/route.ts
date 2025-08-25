import { NextRequest, NextResponse } from 'next/server';
import { getAuthHeaders } from '@/lib/auth';

const BACKEND_URL = process.env.BACKEND_URL;

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const authHeaders = await getAuthHeaders();

    const { plan } = body;
    
    if (!plan) {
      return NextResponse.json(
        { error: 'Missing required field: plan' },
        { status: 400 }
      );
    }

    // Get the base URL for success and cancel URLs
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const host = request.headers.get('host') || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;

    const response = await fetch(`${BACKEND_URL}/api/subscription/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders
      },
      body: JSON.stringify({ 
        plan,
        successUrl: `${baseUrl}/dashboard`,
        cancelUrl: `${baseUrl}/dashboard/subscription`
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Failed to create checkout session' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
