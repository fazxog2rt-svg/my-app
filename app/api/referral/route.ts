import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

const referralsData: any[] = [];

function generateReferralCode() {
  return 'REF' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { action, referralCode, referredUserId } = await request.json();

  if (action === 'generate') {
    const existingCode = referralsData.find(r => r.referrerId === session.user?.email);
    
    if (existingCode) {
      return NextResponse.json({
        success: true,
        referralCode: existingCode.referralCode,
        bonus: 500,
      });
    }

    const code = generateReferralCode();
    const referral = {
      id: Math.random().toString(36).substr(2, 9),
      referrerId: session.user?.email,
      referralCode: code,
      referrals: [],
      totalBonus: 0,
      createdAt: new Date(),
    };

    referralsData.push(referral);

    return NextResponse.json({
      success: true,
      referralCode: code,
      bonus: 500,
      message: 'Share this code to earn rewards!',
    });
  }

  if (action === 'redeem' && referralCode) {
    const referrer = referralsData.find(r => r.referralCode === referralCode);

    if (!referrer) {
      return NextResponse.json({ error: 'Invalid referral code' }, { status: 404 });
    }

    if (referrer.referrals.includes(referredUserId)) {
      return NextResponse.json({ error: 'Already referred by this code' }, { status: 400 });
    }

    referrer.referrals.push(referredUserId);
    referrer.totalBonus += 500;

    return NextResponse.json({
      success: true,
      message: 'Referral code redeemed successfully!',
      bonus: 500,
      referrerName: 'Friend',
    });
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}

export async function GET(request: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const referrer = referralsData.find(r => r.referrerId === session.user?.email);

  if (!referrer) {
    return NextResponse.json({
      success: true,
      referralCode: null,
      referrals: [],
      totalBonus: 0,
      totalEarned: 0,
    });
  }

  return NextResponse.json({
    success: true,
    referralCode: referrer.referralCode,
    referrals: referrer.referrals,
    totalReferrals: referrer.referrals.length,
    totalBonus: referrer.totalBonus,
    totalEarned: referrer.totalBonus * 10, // $10 per 500 points
    referralLink: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/signup?ref=${referrer.referralCode}`,
  });
}
