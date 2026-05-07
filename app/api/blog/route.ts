import { NextResponse } from 'next/server';
import { DEMO_BLOG_POSTS } from '@/lib/constants';

export async function GET() {
  return NextResponse.json({
    success: true,
    posts: DEMO_BLOG_POSTS,
    count: DEMO_BLOG_POSTS.length,
  });
}
