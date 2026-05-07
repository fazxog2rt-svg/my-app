import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  if (!email || !name || !password) {
    return NextResponse.json(
      { success: false, message: 'Missing required fields' },
      { status: 400 }
    );
  }

  // Mock user creation
  const newUser = {
    id: String(Date.now()),
    email,
    name,
    role: 'user' as const,
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json({
    success: true,
    user: newUser,
    message: 'Account created successfully',
  });
}
