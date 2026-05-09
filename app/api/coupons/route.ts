import { NextResponse } from 'next/server';

const couponsData: any[] = [
  {
    id: '1',
    code: 'WELCOME10',
    discountType: 'percentage',
    discountValue: 10,
    maxUses: 100,
    currentUses: 45,
    expiresAt: new Date('2026-12-31'),
    active: true,
    minOrderValue: 0,
  },
  {
    id: '2',
    code: 'SAVE20',
    discountType: 'percentage',
    discountValue: 20,
    maxUses: 50,
    currentUses: 30,
    expiresAt: new Date('2026-06-30'),
    active: true,
    minOrderValue: 100,
  },
  {
    id: '3',
    code: 'FLAT50',
    discountType: 'fixed',
    discountValue: 50,
    maxUses: 30,
    currentUses: 28,
    expiresAt: new Date('2026-05-31'),
    active: true,
    minOrderValue: 200,
  },
];

export async function POST(request: Request) {
  const { code, orderTotal } = await request.json();

  const coupon = couponsData.find(c => c.code.toUpperCase() === code.toUpperCase());

  if (!coupon) {
    return NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
  }

  if (!coupon.active) {
    return NextResponse.json({ error: 'Coupon is inactive' }, { status: 400 });
  }

  if (coupon.currentUses >= coupon.maxUses) {
    return NextResponse.json({ error: 'Coupon usage limit reached' }, { status: 400 });
  }

  if (new Date() > coupon.expiresAt) {
    return NextResponse.json({ error: 'Coupon has expired' }, { status: 400 });
  }

  if (coupon.minOrderValue && orderTotal < coupon.minOrderValue) {
    return NextResponse.json(
      { error: `Minimum order value: $${coupon.minOrderValue}` },
      { status: 400 }
    );
  }

  let discount = 0;
  if (coupon.discountType === 'percentage') {
    discount = (orderTotal * coupon.discountValue) / 100;
  } else {
    discount = coupon.discountValue;
  }

  coupon.currentUses += 1;

  return NextResponse.json({
    success: true,
    coupon: coupon.code,
    discountType: coupon.discountType,
    discountValue: coupon.discountValue,
    discount: parseFloat(discount.toFixed(2)),
    finalTotal: parseFloat((orderTotal - discount).toFixed(2)),
  });
}

export async function GET(request: Request) {
  const activeCoupons = couponsData.filter(c => 
    c.active && 
    c.currentUses < c.maxUses && 
    new Date() < c.expiresAt
  );

  return NextResponse.json({
    success: true,
    coupons: activeCoupons,
    count: activeCoupons.length,
  });
}
