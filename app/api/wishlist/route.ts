import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

const wishlistData: any[] = [];

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { productId, productName, productPrice, productImage } = await request.json();

  const wishlistItem = {
    id: Math.random().toString(36).substr(2, 9),
    userId: session.user.email,
    productId,
    productName,
    productPrice,
    productImage,
    createdAt: new Date(),
  };

  wishlistData.push(wishlistItem);

  return NextResponse.json({
    success: true,
    message: 'Added to wishlist',
    item: wishlistItem,
  });
}

export async function GET(request: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userWishlist = wishlistData.filter(w => w.userId === session.user?.email);

  return NextResponse.json({
    success: true,
    wishlist: userWishlist,
    count: userWishlist.length,
  });
}

export async function DELETE(request: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { productId } = await request.json();
  const index = wishlistData.findIndex(w => w.userId === session.user?.email && w.productId === productId);

  if (index > -1) {
    wishlistData.splice(index, 1);
  }

  return NextResponse.json({
    success: true,
    message: 'Removed from wishlist',
  });
}
