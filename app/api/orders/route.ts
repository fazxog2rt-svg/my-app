import { NextResponse } from 'next/server';

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export async function POST(request: Request) {
  const body = await request.json();
  const { items } = body;

  if (!items || !Array.isArray(items)) {
    return NextResponse.json(
      { success: false, message: 'Invalid cart data' },
      { status: 400 }
    );
  }

  const total = items.reduce((sum: number, item: CartItem) => 
    sum + (item.price * item.quantity), 0
  );

  // Mock order creation
  const order = {
    id: `ORD-${Date.now()}`,
    items,
    total,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json({
    success: true,
    order,
    message: 'Order created successfully',
  });
}
