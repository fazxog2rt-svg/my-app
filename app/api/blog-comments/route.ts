import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

const blogCommentsData: any[] = [];

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { postId, content } = await request.json();

  if (!content || content.trim().length === 0) {
    return NextResponse.json({ error: 'Comment cannot be empty' }, { status: 400 });
  }

  const comment = {
    id: Math.random().toString(36).substr(2, 9),
    postId,
    userId: session.user.email,
    userName: session.user.name,
    content,
    likes: 0,
    createdAt: new Date(),
    verified: true,
  };

  blogCommentsData.push(comment);

  return NextResponse.json({
    success: true,
    message: 'Comment posted successfully',
    comment,
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');

  if (!postId) {
    return NextResponse.json({ error: 'Post ID required' }, { status: 400 });
  }

  const comments = blogCommentsData
    .filter(c => c.postId === postId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return NextResponse.json({
    success: true,
    comments,
    count: comments.length,
  });
}

export async function PATCH(request: Request) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { commentId, action } = await request.json();

  const comment = blogCommentsData.find(c => c.id === commentId);

  if (!comment) {
    return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
  }

  if (action === 'like') {
    comment.likes += 1;
  }

  return NextResponse.json({
    success: true,
    message: `Comment ${action}d`,
    comment,
  });
}

export async function DELETE(request: Request) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { commentId } = await request.json();

  const index = blogCommentsData.findIndex(c => c.id === commentId && c.userId === session.user?.email);

  if (index === -1) {
    return NextResponse.json({ error: 'Comment not found or unauthorized' }, { status: 404 });
  }

  blogCommentsData.splice(index, 1);

  return NextResponse.json({
    success: true,
    message: 'Comment deleted',
  });
}
