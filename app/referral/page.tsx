'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ReferralProgram() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [referral, setReferral] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      fetchReferral();
    }
  }, [session]);

  const fetchReferral = async () => {
    try {
      const res = await fetch('/api/referral');
      if (res.ok) {
        const data = await res.json();
        setReferral(data);
      }
    } catch (error) {
      console.error('Failed to fetch referral:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateCode = async () => {
    try {
      const res = await fetch('/api/referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'generate' }),
      });

      if (res.ok) {
        const data = await res.json();
        setReferral(data);
      }
    } catch (error) {
      console.error('Failed to generate code:', error);
    }
  };

  const copyToClipboard = () => {
    if (referral?.referralLink) {
      navigator.clipboard.writeText(referral.referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Loading referral program...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          🎯 Referral Program
        </h1>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Share the Love & Earn Rewards!</h2>
          <p className="mb-4 text-white/90">
            Invite friends to Ulagan and earn $5 for every successful referral. They get a discount, you get rewarded!
          </p>
          <p className="text-white/80">
            💰 Unlimited earnings • 🎁 Instant payouts • ⭐ No limits
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Your Code */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              🔗 Your Referral Code
            </h3>

            {referral?.referralCode ? (
              <div className="space-y-4">
                <div className="p-4 bg-gray-100 dark:bg-slate-700 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Code:</p>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                    {referral.referralCode}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                    Share Your Link:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={referral.referralLink}
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white text-sm"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
                    >
                      {copied ? '✓ Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    onClick={() => window.open(`https://twitter.com/intent/tweet?text=Check out Ulagan! Use my referral code: ${referral.referralCode}`, '_blank')}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold"
                  >
                    Share on Twitter
                  </button>
                  <button
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referral.referralLink)}`, '_blank')}
                    className="flex-1 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition font-semibold"
                  >
                    Share on Facebook
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Generate your unique referral code to start earning!
                </p>
                <button
                  onClick={generateCode}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
                >
                  Generate Code
                </button>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              📊 Your Stats
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-slate-700 rounded-lg">
                <span className="text-gray-900 dark:text-white font-semibold">Total Referrals</span>
                <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  {referral?.totalReferrals || 0}
                </span>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-slate-700 rounded-lg">
                <span className="text-gray-900 dark:text-white font-semibold">Total Earned</span>
                <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                  ${referral?.totalEarned || 0}
                </span>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-slate-700 rounded-lg">
                <span className="text-gray-900 dark:text-white font-semibold">Points</span>
                <span className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                  {referral?.totalBonus || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            ✨ How It Works
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Share Your Code</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Send your unique referral code to friends
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">They Sign Up</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Your friends join Ulagan using your code
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">You Earn!</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Get $5 for each successful referral
              </p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            🎁 Your Friend Gets:
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-gray-900 dark:text-white">
              <span className="text-green-600">✓</span> 10% discount on their first purchase
            </li>
            <li className="flex items-center gap-2 text-gray-900 dark:text-white">
              <span className="text-green-600">✓</span> Free shipping on first order
            </li>
            <li className="flex items-center gap-2 text-gray-900 dark:text-white">
              <span className="text-green-600">✓</span> 500 bonus loyalty points
            </li>
            <li className="flex items-center gap-2 text-gray-900 dark:text-white">
              <span className="text-green-600">✓</span> Early access to new products
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
