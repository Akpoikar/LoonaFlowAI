import { cookies } from 'next/headers';

export function getAuthToken(): string | null {
  const cookieStore = cookies();
  
  const token = cookieStore.get('auth-token')?.value || null;
  return token;
}

export function getAuthHeaders(): Record<string, string> {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}
