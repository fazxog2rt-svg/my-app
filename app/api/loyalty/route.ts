import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

const loyaltyData: any[] = [];

function calculateLevel(totalSpent: number) {
  if (totalSpent >= 5000) return 'platinum';
  if (totalSpent >= 3000) return 'gold';
  if (totalSpent >= 1000) return 'silver';
  return 'bronze';
}

function calculatePoints(orderTotal: number) {
  return Math.floor(orderTotal); // 1 point per dollar
}

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { orderTotal, action } = await request.json();

  let loyalty = loyaltyData.find(l => l.userId === session.user?.email);

  if (!loyalty) {
    loyalty = {
      id: Math.random().toString(36).substr(2, 9),
      userId: session.user?.email,
      points: 0,
      level: 'bronze',
      totalSpent: 0,
      createdAt: new Date(),
      lastUpdated: new Date(),
    };
    loyaltyData.push(loyalty);
  }

  if (action === 'addOrder') {
    const points = calculatePoints(orderTotal);
    loyalty.points += points;
    loyalty.totalSpent += orderTotal;
    loyalty.level = calculateLevel(loyalty.totalSpent);
  } else if (action === 'redeem') {
    loyalty.points = Math.max(0, loyalty.points - orderTotal);
  }

  loyalty.lastUpdated = new Date();

  return NextResponse.json({
    success: true,
    loyalty: {
      points: loyalty.points,
      level: loyalty.level,
      totalSpent: loyalty.totalSpent,
      levelBenefits: getLevelBenefits(loyalty.level),
    },
  });
}

export async function GET(request: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let loyalty = loyaltyData.find(l => l.userId === session.user?.email);

  if (!loyalty) {
    loyalty = {
      id: Math.random().toString(36).substr(2, 9),
      userId: session.user?.email,
      points: 0,
      level: 'bronze',
      totalSpent: 0,
      createdAt: new Date(),
      lastUpdated: new Date(),
    };
    loyaltyData.push(loyalty);
  }

  return NextResponse.json({
    success: true,
    loyalty: {
      points: loyalty.points,
      level: loyalty.level,
      totalSpent: loyalty.totalSpent,
      levelBenefits: getLevelBenefits(loyalty.level),
      nextLevelAt: getNextLevelThreshold(loyalty.totalSpent),
    },
  });
}

function getLevelBenefits(level: string) {
  const benefits: any = {
    bronze: { discount: 5, freeShipping: false, priority: false },
    silver: { discount: 10, freeShipping: false, priority: false },
    gold: { discount: 15, freeShipping: true, priority: false },
    platinum: { discount: 20, freeShipping: true, priority: true },
  };
  return benefits[level];
}

function getNextLevelThreshold(currentSpent: number) {
  if (currentSpent < 1000) return { level: 'silver', amount: 1000 - currentSpent };
  if (currentSpent < 3000) return { level: 'gold', amount: 3000 - currentSpent };
  if (currentSpent < 5000) return { level: 'platinum', amount: 5000 - currentSpent };
  return { level: 'platinum', amount: 0 };
}
