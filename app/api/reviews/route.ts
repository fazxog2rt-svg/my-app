import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

const reviewsData: any[] = [];

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { productId, rating, title, comment } = await request.json();

  if (rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Rating must be 1-5' }, { status: 400 });
  }

  const review = {
    id: Math.random().toString(36).substr(2, 9),
    productId,
    userId: session.user.email,
    userName: session.user.name,
    rating,
    title,
    comment,
    helpful: 0,
    createdAt: new Date(),
    verified: true,
  };

  reviewsData.push(review);

  return NextResponse.json({
    success: true,
    message: 'Review submitted successfully',
    review,
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');

  if (!productId) {
    return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
  }

  const productReviews = reviewsData.filter(r => r.productId === productId);
  const avgRating = productReviews.length > 0 
    ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1)
    : 0;

  return NextResponse.json({
    success: true,
    reviews: productReviews,
    averageRating: avgRating,
    totalReviews: productReviews.length,
  });
}
