import { NextRequest, NextResponse } from 'next/server';
import { getAuthHeaders } from '@/lib/auth';

const BACKEND_URL = process.env.BACKEND_URL;

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const authHeaders = await getAuthHeaders();
    
    const response = await fetch(`${BACKEND_URL}/api/email-config`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Failed to fetch email configurations' },
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const authHeaders = await getAuthHeaders();

    // Validate required fields
    const { name, smtpServer, smtpPort, emailAddress, emailPassword, isDefault } = body;
    
    if (!name || !smtpServer || !smtpPort || !emailAddress || !emailPassword) {
      return NextResponse.json(
        { error: 'Missing required fields: name, smtpServer, smtpPort, emailAddress, emailPassword' },
        { status: 400 }
      );
    }

    const response = await fetch(`${BACKEND_URL}/api/email-config`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders
      },
      body: JSON.stringify({
        name,
        smtpServer,
        smtpPort,
        emailAddress,
        emailPassword,
        isDefault: isDefault || false
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Failed to create email configuration' },
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
