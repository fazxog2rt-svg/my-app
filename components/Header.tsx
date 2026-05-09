'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();
  const { items } = useCartStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              🚀 Ulagan
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition">
              About
            </Link>
            <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition">
              Blog
            </Link>
            <Link href="/shop" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition">
              Shop
            </Link>
            <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition">
              Contact
            </Link>
            {session?.user && (
              <>
                <Link href="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition">
                  Dashboard
                </Link>
                <Link href="/wishlist" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition">
                  ❤️ Wishlist
                </Link>
                <Link href="/loyalty" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition">
                  🎁 Loyalty
                </Link>
                <Link href="/messages" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition">
                  💬 Messages
                </Link>
                <Link href="/referral" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition">
                  🔗 Refer
                </Link>
              </>
            )}
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            <Link href="/cart" className="relative">
              <span className="text-2xl">🛒</span>
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>

            {session?.user ? (
              <div className="flex items-center gap-4">
                <img
                  src={session.user.image || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + session.user.email}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:inline">
                  {session.user.name}
                </span>
                <Link href="/profile" className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-lg transition">
                  Login
                </Link>
                <Link href="/signup" className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/about" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600">
              About
            </Link>
            <Link href="/blog" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600">
              Blog
            </Link>
            <Link href="/shop" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600">
              Shop
            </Link>
            <Link href="/contact" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600">
              Contact
            </Link>
            {session?.user && (
              <>
                <Link href="/dashboard" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600">
                  Dashboard
                </Link>
                <Link href="/wishlist" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600">
                  ❤️ Wishlist
                </Link>
                <Link href="/loyalty" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600">
                  🎁 Loyalty
                </Link>
                <Link href="/messages" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600">
                  💬 Messages
                </Link>
                <Link href="/referral" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600">
                  🔗 Refer
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
