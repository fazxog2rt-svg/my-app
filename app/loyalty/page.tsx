'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoyaltyProgram() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loyalty, setLoyalty] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      fetchLoyalty();
    }
  }, [session]);

  const fetchLoyalty = async () => {
    try {
      const res = await fetch('/api/loyalty');
      if (res.ok) {
        const data = await res.json();
        setLoyalty(data.loyalty);
      }
    } catch (error) {
      console.error('Failed to fetch loyalty:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const levelColors: any = {
    bronze: 'from-yellow-600 to-yellow-400',
    silver: 'from-gray-400 to-gray-200',
    gold: 'from-yellow-500 to-yellow-300',
    platinum: 'from-purple-600 to-blue-400',
  };

  const levelBenefits: any = {
    bronze: {
      discount: '5%',
      freeShipping: false,
      priority: false,
      description: 'Welcome to Bronze membership!',
    },
    silver: {
      discount: '10%',
      freeShipping: false,
      priority: false,
      description: 'Increased rewards with Silver membership!',
    },
    gold: {
      discount: '15%',
      freeShipping: true,
      priority: false,
      description: 'Enjoy exclusive Gold member benefits!',
    },
    platinum: {
      discount: '20%',
      freeShipping: true,
      priority: true,
      description: 'VIP Platinum member status!',
    },
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Loading loyalty program...</p>
      </div>
    );
  }

  if (!loyalty) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">No loyalty data found</p>
      </div>
    );
  }

  const benefits = levelBenefits[loyalty.level] || levelBenefits.bronze;
  const color = levelColors[loyalty.level] || 'from-yellow-600 to-yellow-400';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          🎁 Loyalty Program
        </h1>

        {/* Current Level Card */}
        <div className={`bg-gradient-to-r ${color} text-white rounded-lg shadow-lg p-8 mb-8`}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm opacity-90 mb-2">Your Current Level</p>
              <h2 className="text-4xl font-bold uppercase">{loyalty.level} Member</h2>
            </div>
            <div className="text-6xl">👑</div>
          </div>
          <p className="text-white/90 mb-2">{benefits.description}</p>
          <p className="text-white/80">Total Spent: ${loyalty.totalSpent.toFixed(2)}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Points Card */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              💰 Your Points
            </h3>

            <div className="relative h-2 bg-gray-200 dark:bg-slate-700 rounded-full mb-6 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                style={{ width: `${Math.min((loyalty.points / 5000) * 100, 100)}%` }}
              ></div>
            </div>

            <p className="text-center text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
              {loyalty.points.toLocaleString()}
            </p>

            <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
              Out of 5000 for Platinum
            </p>

            <div className="space-y-2">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                • 1 point = $1 spent
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                • Redeem anytime for discounts
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                • Never expire
              </p>
            </div>
          </div>

          {/* Benefits Card */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              ✨ Your Benefits
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">💎</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Discount</p>
                  <p className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">
                    {benefits.discount} off
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-2xl">{benefits.freeShipping ? '✓' : '✕'}</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Free Shipping</p>
                  <p className={benefits.freeShipping ? 'text-green-600' : 'text-gray-500'}>
                    {benefits.freeShipping ? 'Included' : 'Upgrade for free shipping'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-2xl">{benefits.priority ? '✓' : '✕'}</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Priority Support</p>
                  <p className={benefits.priority ? 'text-green-600' : 'text-gray-500'}>
                    {benefits.priority ? 'Available' : 'Upgrade for priority support'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Level Progression */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            📊 Level Progression
          </h3>

          <div className="grid md:grid-cols-4 gap-4">
            {['bronze', 'silver', 'gold', 'platinum'].map(level => {
              const isActive = loyalty.level === level;
              return (
                <div
                  key={level}
                  className={`p-4 rounded-lg text-center transition ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white'
                  }`}
                >
                  <p className="text-sm font-semibold mb-2 uppercase">{level}</p>
                  <p className="text-xs opacity-75">Spend from $0</p>
                  {isActive && <p className="text-xs mt-2 font-bold">✓ Current</p>}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <p className="text-blue-900 dark:text-blue-300">
            💡 <strong>Tip:</strong> Every purchase earns points. Watch your level grow and unlock
            exclusive benefits!
          </p>
        </div>
      </div>
    </div>
  );
}
