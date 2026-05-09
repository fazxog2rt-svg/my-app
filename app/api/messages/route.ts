import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

const messagesData: any[] = [];

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { toUserId, content } = await request.json();

  const message = {
    id: Math.random().toString(36).substr(2, 9),
    fromUserId: session.user?.email,
    fromUserName: session.user?.name,
    toUserId,
    content,
    read: false,
    createdAt: new Date(),
  };

  messagesData.push(message);

  return NextResponse.json({
    success: true,
    message: 'Message sent',
    data: message,
  });
}

export async function GET(request: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'received';
  const conversationWith = searchParams.get('with');

  let userMessages = [];

  if (type === 'received') {
    userMessages = messagesData.filter(m => m.toUserId === session.user?.email);
  } else if (type === 'sent') {
    userMessages = messagesData.filter(m => m.fromUserId === session.user?.email);
  } else if (type === 'conversation' && conversationWith) {
    userMessages = messagesData.filter(m =>
      (m.fromUserId === session.user?.email && m.toUserId === conversationWith) ||
      (m.toUserId === session.user?.email && m.fromUserId === conversationWith)
    );
  }

  const unreadCount = messagesData.filter(m => m.toUserId === session.user?.email && !m.read).length;

  return NextResponse.json({
    success: true,
    messages: userMessages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    unreadCount,
    count: userMessages.length,
  });
}

export async function PATCH(request: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { messageId } = await request.json();

  const message = messagesData.find(m => m.id === messageId && m.toUserId === session.user?.email);

  if (!message) {
    return NextResponse.json({ error: 'Message not found' }, { status: 404 });
  }

  message.read = true;

  return NextResponse.json({
    success: true,
    message: 'Message marked as read',
  });
}
