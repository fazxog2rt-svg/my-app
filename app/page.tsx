export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto mb-12">
          <div className="text-6xl mb-4">🚀</div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Welcome to Ulagan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            A modern, full-featured web application built with Next.js 16, React 19, and Tailwind CSS.
            Deployed on Vercel for lightning-fast performance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/blog" className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md">
              Explore Blog
            </a>
            <a href="/shop" className="px-8 py-3 bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border-2 border-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 dark:hover:bg-slate-700 transition">
              Visit Shop
            </a>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white dark:bg-slate-800 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            ✨ Features
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Auth */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-700 dark:to-slate-600 rounded-lg p-6">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Authentication</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Complete user authentication system with login, signup, and profile management.
              </p>
            </div>

            {/* Dashboard */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-slate-700 dark:to-slate-600 rounded-lg p-6">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Dashboard</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Interactive admin dashboard with analytics, stats, and real-time data.
              </p>
            </div>

            {/* Blog */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-slate-700 dark:to-slate-600 rounded-lg p-6">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Blog System</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Full-featured blog with categories, search, and comment system.
              </p>
            </div>

            {/* E-Commerce */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-slate-700 dark:to-slate-600 rounded-lg p-6">
              <div className="text-4xl mb-4">🛍️</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">E-Commerce</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Complete shopping system with products, cart, and order management.
              </p>
            </div>

            {/* Real-time */}
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-slate-700 dark:to-slate-600 rounded-lg p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Real-time Features</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Notifications, state management, and instant updates.
              </p>
            </div>

            {/* SEO & Analytics */}
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-slate-700 dark:to-slate-600 rounded-lg p-6">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">SEO & Analytics</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Optimized for search engines with built-in analytics tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            🛠️ Tech Stack
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 text-center shadow">
              <div className="text-3xl mb-2">⚛️</div>
              <h4 className="font-bold text-gray-900 dark:text-white">React 19</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">UI Library</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 text-center shadow">
              <div className="text-3xl mb-2">▲</div>
              <h4 className="font-bold text-gray-900 dark:text-white">Next.js 16</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Framework</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 text-center shadow">
              <div className="text-3xl mb-2">🎨</div>
              <h4 className="font-bold text-gray-900 dark:text-white">Tailwind CSS</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Styling</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 text-center shadow">
              <div className="text-3xl mb-2">🚀</div>
              <h4 className="font-bold text-gray-900 dark:text-white">Vercel</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Hosting</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-indigo-100 mb-8 text-lg">
            Sign up now to access all features and start building amazing things.
          </p>
          <a href="/signup" className="inline-block px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition shadow-lg">
            Create Account
          </a>
        </div>
      </section>
    </div>
  );
}
