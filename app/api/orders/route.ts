import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

// Mock orders storage
const ordersStorage: any[] = [];

export async function POST(request: Request) {
  const session = await getServerSession();
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
    userId: (session?.user as any)?.id || 'guest',
    userEmail: session?.user?.email || 'guest',
    items,
    total,
    status: 'completed',
    createdAt: new Date().toISOString(),
  };

  ordersStorage.push(order);

  return NextResponse.json({
    success: true,
    order,
    message: 'Order created successfully',
  });
}

export async function GET() {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const userOrders = ordersStorage.filter(o => o.userEmail === session.user?.email);

  return NextResponse.json({
    success: true,
    orders: userOrders,
  });
}
