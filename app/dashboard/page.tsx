'use client';

import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          Dashboard
        </h1>

        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome, {user.name}! 👋</h2>
          <p className="text-indigo-100">You're logged in as a {user.role} user</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm">Total Orders</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm">Revenue</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">$2,340</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
            <div className="text-3xl mb-2">👥</div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm">Customers</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">156</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
            <div className="text-3xl mb-2">📈</div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm">Growth</h3>
            <p className="text-2xl font-bold text-green-600">+12%</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Recent Activity</h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li>✅ Order #1024 completed</li>
              <li>💬 New comment on blog post</li>
              <li>🆕 3 new products added</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
            <div className="space-y-2">
              <a href="/blog" className="block px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded hover:bg-indigo-200 transition">
                Manage Blog
              </a>
              <a href="/shop" className="block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded hover:bg-purple-200 transition">
                Manage Shop
              </a>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">System Status</h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-gray-700 dark:text-gray-300">All systems operational</span>
              </p>
              <p className="text-gray-600 dark:text-gray-400">Uptime: 99.9%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
