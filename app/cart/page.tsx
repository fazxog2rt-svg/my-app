'use client';

import { useCartStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Cart() {
  const { data: session } = useSession();
  const { items, total, removeItem, updateQuantity, clearCart } = useCartStore();
  const router = useRouter();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  const handleCheckout = async () => {
    if (!session) {
      router.push('/login');
      return;
    }

    setCheckoutLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, total: total + total * 0.1 }),
      });

      if (res.ok) {
        alert('Order placed successfully! 🎉');
        clearCart();
        router.push('/dashboard');
      }
    } catch (error) {
      alert('Checkout failed. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-8xl mb-4">🛒</div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Your cart is empty
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Add some products to get started!
          </p>
          <a href="/shop" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
            Browse Products
          </a>
        </div>
      </div>
    );
  }

  const taxAmount = total * 0.1;
  const finalTotal = total + taxAmount;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          🛍️ Shopping Cart ({items.length} items)
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item.productId} className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">📦</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      Product #{item.productId}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-700 rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                      className="px-3 py-1 hover:bg-gray-200 dark:hover:bg-slate-600 rounded"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-200 dark:hover:bg-slate-600 rounded"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-indigo-600 dark:text-indigo-400">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-red-600 hover:text-red-700 text-sm mt-1 font-semibold"
                    >
                      ✕ Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                💳 Order Summary
              </h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 dark:border-slate-700">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal ({items.length} items)</span>
                  <span className="text-gray-900 dark:text-white font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="text-green-600 dark:text-green-400 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Tax (10%)</span>
                  <span className="text-gray-900 dark:text-white font-semibold">${taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-3">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-indigo-600 dark:text-indigo-400">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={checkoutLoading || !session}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed mb-2"
              >
                {checkoutLoading ? '⏳ Processing...' : session ? '✓ Proceed to Checkout' : '🔒 Login to Checkout'}
              </button>

              <button
                onClick={() => router.push('/shop')}
                className="w-full border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 py-2 rounded-lg font-semibold hover:bg-indigo-50 dark:hover:bg-slate-700 transition mb-2"
              >
                Continue Shopping
              </button>

              <button
                onClick={clearCart}
                className="w-full text-red-600 hover:text-red-700 py-2 font-semibold"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
