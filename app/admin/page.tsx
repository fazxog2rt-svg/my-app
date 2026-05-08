'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DEMO_PRODUCTS } from '@/lib/constants';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
    // Check if admin - in real app would verify role
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      fetchStats();
    }
  }, [session]);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/analytics');
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          🛡️ Admin Panel
        </h1>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {['overview', 'users', 'products', 'orders'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && stats && (
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-2">👥</div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-1">Total Users</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalUsers}</p>
              <p className="text-xs text-green-600 mt-2">↑ 12% from last month</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-2">🛒</div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-1">Total Orders</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalOrders}</p>
              <p className="text-xs text-green-600 mt-2">↑ 8% from last month</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-1">Revenue</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">${(stats.totalRevenue / 1000).toFixed(1)}K</p>
              <p className="text-xs text-green-600 mt-2">↑ 15% from last month</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-1">Conversion Rate</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.conversionRate}%</p>
              <p className="text-xs text-green-600 mt-2">↑ 2% from last month</p>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Products Management</h2>
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold">
                + Add Product
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">ID</th>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">Name</th>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">Price</th>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">Category</th>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">Stock</th>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">Rating</th>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {DEMO_PRODUCTS.map(product => (
                    <tr key={product.id} className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                      <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400">{product.id}</td>
                      <td className="py-3 px-4 font-semibold text-gray-900 dark:text-white">{product.name}</td>
                      <td className="py-3 px-4 text-gray-900 dark:text-white">${product.price}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{product.category}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${product.stock > 10 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-yellow-500">⭐ {product.rating}</td>
                      <td className="py-3 px-4">
                        <button className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold text-sm mr-3">
                          Edit
                        </button>
                        <button className="text-red-600 dark:text-red-400 hover:underline font-semibold text-sm">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users & Orders Tabs */}
        {activeTab === 'users' && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Users Management</h2>
            <p className="text-gray-600 dark:text-gray-400">User management feature coming soon...</p>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Orders Management</h2>
            <p className="text-gray-600 dark:text-gray-400">Orders management feature coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}
