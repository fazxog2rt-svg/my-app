import { NextResponse } from 'next/server';
import { DEMO_PRODUCTS } from '@/lib/constants';

export async function GET() {
  return NextResponse.json({
    success: true,
    products: DEMO_PRODUCTS,
    count: DEMO_PRODUCTS.length,
  });
}
