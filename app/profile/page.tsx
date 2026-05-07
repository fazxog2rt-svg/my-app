'use client';

import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Profile() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);

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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          My Profile
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                👤
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">
                {user.name}
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-2">
                {user.email}
              </p>
              <p className="text-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-6">
                Role: {user.role.toUpperCase()}
              </p>
              <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-semibold">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Account Information */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Account Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400">Email Address</label>
                  <p className="text-gray-900 dark:text-white font-semibold">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400">Full Name</label>
                  <p className="text-gray-900 dark:text-white font-semibold">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400">Member Since</label>
                  <p className="text-gray-900 dark:text-white font-semibold">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Order History
              </h3>
              {orders.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">No orders yet</p>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                      <span>Order #{order.id}</span>
                      <span className="font-semibold">${order.total.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Settings
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition">
                  📧 Email Preferences
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition">
                  🔐 Change Password
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition">
                  🛡️ Privacy Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
