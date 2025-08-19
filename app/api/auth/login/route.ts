import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log('Backend login response:', { status: response.status, data: data }); // Debug log

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Login failed' },
        { status: response.status }
      );
    }

    // Set the JWT token in a secure HTTP-only cookie
    const responseWithCookie = NextResponse.json(
      { message: 'Login successful', user: data.user },
      { status: 200 }
    );

    console.log('Setting auth-token cookie with value:', data.token ? 'TOKEN_PRESENT' : 'NO_TOKEN'); // Debug log
    console.log('Token length:', data.token ? data.token.length : 0); // Debug log

    responseWithCookie.cookies.set('auth-token', data.token, {
      httpOnly: true,
      secure: false, // Set to false for development
      sameSite: 'lax', // Changed from 'strict' to 'lax' for development
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/', // Ensure cookie is available for all paths
    });

    console.log('Cookie set successfully'); // Debug log
    return responseWithCookie;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
