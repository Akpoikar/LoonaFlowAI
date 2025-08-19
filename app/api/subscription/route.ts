import { NextRequest, NextResponse } from 'next/server';
import { getAuthHeaders } from '@/lib/auth';

const BACKEND_URL = process.env.BACKEND_URL;

export async function GET(request: NextRequest) {
  try {
    const authHeaders = await getAuthHeaders();
    
    const response = await fetch(`${BACKEND_URL}/api/subscription`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Failed to fetch subscription' },
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

export async function PUT(request: NextRequest) {
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

    const response = await fetch(`${BACKEND_URL}/api/subscription`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders
      },
      body: JSON.stringify({ plan })
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Failed to update subscription' },
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
