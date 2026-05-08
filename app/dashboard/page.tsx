'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      fetchData();
    }
  }, [session]);

  const fetchData = async () => {
    try {
      const [statsRes, ordersRes] = await Promise.all([
        fetch('/api/analytics'),
        fetch('/api/orders'),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.stats);
      }

      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOrders(ordersData.orders);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          📊 Dashboard
        </h1>

        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-8 mb-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome, {session.user.name}! 👋</h2>
              <p className="text-indigo-100">{session.user.email}</p>
            </div>
            {session.user.image && (
              <img
                src={session.user.image}
                alt="Profile"
                className="w-16 h-16 rounded-full border-4 border-white"
              />
            )}
          </div>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm">Total Users</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalUsers}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-2">🛒</div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm">Total Orders</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalOrders}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm">Revenue</h3>
              <p className="text-2xl font-bold text-green-600">${(stats.totalRevenue / 1000).toFixed(1)}K</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-2">📈</div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm">Avg Order</h3>
              <p className="text-2xl font-bold text-indigo-600">${stats.averageOrderValue}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm">Conversion</h3>
              <p className="text-2xl font-bold text-purple-600">{stats.conversionRate}%</p>
            </div>
          </div>
        )}

        {/* Orders Section */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            📋 Your Orders
          </h2>

          {orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400 mb-4">No orders yet</p>
              <a href="/shop" className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                Start Shopping
              </a>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">Order ID</th>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">Date</th>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">Items</th>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">Total</th>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                      <td className="py-3 px-4 font-mono text-sm text-indigo-600 dark:text-indigo-400">{order.id}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="py-3 px-4 text-gray-900 dark:text-white">{order.items.length} item(s)</td>
                      <td className="py-3 px-4 font-bold text-indigo-600 dark:text-indigo-400">${order.total.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">📚 Quick Links</h3>
            <div className="space-y-2">
              <a href="/shop" className="block px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition font-semibold">
                Shop Products
              </a>
              <a href="/blog" className="block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded hover:bg-purple-200 dark:hover:bg-purple-900/50 transition font-semibold">
                Read Blog
              </a>
              <a href="/profile" className="block px-4 py-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded hover:bg-pink-200 dark:hover:bg-pink-900/50 transition font-semibold">
                Edit Profile
              </a>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">🎯 Account Info</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Email</p>
                <p className="text-gray-900 dark:text-white font-semibold">{session.user.email}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Status</p>
                <p className="text-green-600 font-semibold">✓ Active</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">💡 Tips</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>✨ Browse our latest products</li>
              <li>📝 Check our blog for updates</li>
              <li>💬 Contact us anytime</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
