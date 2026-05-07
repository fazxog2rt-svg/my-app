'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { useState } from 'react';

export default function Header() {
  const { user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition">
              Blog
            </Link>
            <Link href="/shop" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition">
              Shop
            </Link>
            {user?.role === 'admin' && (
              <Link href="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition">
                Dashboard
              </Link>
            )}
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {user.name}
                </span>
                <Link href="/profile" className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                  Profile
                </Link>
                <button
                  onClick={logout}
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
            <Link href="/blog" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600">
              Blog
            </Link>
            <Link href="/shop" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600">
              Shop
            </Link>
            {user?.role === 'admin' && (
              <Link href="/dashboard" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600">
                Dashboard
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
