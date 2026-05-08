import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { success: false, message: 'All fields are required' },
      { status: 400 }
    );
  }

  // Mock email sending
  console.log('Contact form submission:', { name, email, subject, message });

  return NextResponse.json({
    success: true,
    message: 'Message sent successfully! We will get back to you soon.',
  });
}
