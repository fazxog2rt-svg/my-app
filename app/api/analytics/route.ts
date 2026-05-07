import { NextResponse } from 'next/server';

export async function GET() {
  const stats = {
    totalUsers: 2450,
    totalOrders: 8925,
    totalRevenue: 125640,
    conversionRate: 3.4,
    averageOrderValue: 14.1,
  };

  return NextResponse.json({
    success: true,
    stats,
  });
}
