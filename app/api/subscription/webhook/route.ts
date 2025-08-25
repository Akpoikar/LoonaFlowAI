import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    
    // Forward the webhook to the backend
    const response = await fetch(`${BACKEND_URL}/api/subscription/webhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Stripe-Signature': request.headers.get('stripe-signature') || '',
      },
      body,
    });

    if (!response.ok) {
      console.error('Webhook forwarding failed:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Webhook processing failed' },
        { status: response.status }
      );
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

