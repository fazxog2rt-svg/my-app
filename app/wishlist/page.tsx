'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Wishlist() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      fetchWishlist();
    }
  }, [session]);

  const fetchWishlist = async () => {
    try {
      const res = await fetch('/api/wishlist');
      if (res.ok) {
        const data = await res.json();
        setWishlist(data.wishlist);
      }
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      const res = await fetch('/api/wishlist', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });

      if (res.ok) {
        setWishlist(wishlist.filter(w => w.productId !== productId));
      }
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  };

  const addToCart = (item: any) => {
    // Mock add to cart
    alert(`Added ${item.productName} to cart!`);
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Loading wishlist...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          ❤️ My Wishlist
        </h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-lg">
            <p className="text-2xl mb-4">Your wishlist is empty</p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start adding items to save for later!
            </p>
            <a
              href="/shop"
              className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Browse Products
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map(item => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center text-5xl">
                  {item.productImage}
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {item.productName}
                  </h3>

                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                    ${item.productPrice.toFixed(2)}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(item)}
                      className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.productId)}
                      className="flex-1 px-4 py-2 border-2 border-red-500 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition font-semibold"
                    >
                      Remove ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
