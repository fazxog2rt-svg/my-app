import { NextResponse } from 'next/server';
import { DEMO_USERS } from '@/lib/constants';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  // Mock authentication - find user from demo users
  const user = DEMO_USERS.find(u => u.email === email && u.password === password);

  if (user) {
    const { password, ...userWithoutPassword } = user;
    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
    });
  }

  return NextResponse.json(
    { success: false, message: 'Invalid credentials' },
    { status: 401 }
  );
}
