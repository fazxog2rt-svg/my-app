'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NotificationContainer, useNotification } from '@/lib/notifications';

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '' });
  const [orders, setOrders] = useState<any[]>([]);
  const { notifications, addNotification, removeNotification } = useNotification();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      setFormData({ name: session.user.name || '' });
      fetchOrders();
    }
  }, [session]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const handleSaveProfile = async () => {
    // Mock save - in real app would call API
    addNotification('Profile updated successfully!', 'success');
    setIsEditing(false);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4">
      <NotificationContainer notifications={notifications} onClose={removeNotification} />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          👤 My Profile
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-5xl mx-auto mb-4 overflow-hidden">
                {session.user.image ? (
                  <img src={session.user.image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  '👤'
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">
                {session.user.name}
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-6 break-all">
                {session.user.email}
              </p>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {/* Account Information */}
          <div className="md:col-span-2 space-y-6">
            {/* Edit Form */}
            {isEditing && (
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border-2 border-indigo-500">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  ✏️ Edit Profile
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 font-semibold">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveProfile}
                      className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 border-2 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Account Details */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                ℹ️ Account Information
              </h3>
              <div className="space-y-4">
                <div className="border-b border-gray-200 dark:border-slate-700 pb-4">
                  <label className="text-sm text-gray-600 dark:text-gray-400 block mb-1">Email Address</label>
                  <p className="text-lg text-gray-900 dark:text-white font-semibold">{session.user.email}</p>
                </div>
                <div className="border-b border-gray-200 dark:border-slate-700 pb-4">
                  <label className="text-sm text-gray-600 dark:text-gray-400 block mb-1">Full Name</label>
                  <p className="text-lg text-gray-900 dark:text-white font-semibold">{session.user.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400 block mb-1">Account Status</label>
                  <p className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full font-semibold">
                    ✓ Active
                  </p>
                </div>
              </div>
            </div>

            {/* Order History */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                📋 Order History
              </h3>
              {orders.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">No orders yet</p>
                  <a href="/shop" className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold">
                    Start Shopping
                  </a>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.slice(0, 5).map(order => (
                    <div key={order.id} className="border border-gray-200 dark:border-slate-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{order.id}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-indigo-600 dark:text-indigo-400">${order.total.toFixed(2)}</p>
                          <span className={`text-xs font-semibold px-2 py-1 rounded ${order.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {orders.length > 5 && (
                    <a href="/dashboard" className="block text-center text-indigo-600 dark:text-indigo-400 hover:underline font-semibold mt-4">
                      View all orders →
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
