export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:to-slate-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm">
        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          Ulagan
        </div>
        <ul className="hidden md:flex gap-8 text-sm font-medium">
          <li><a href="#features" className="hover:text-indigo-600 transition">Features</a></li>
          <li><a href="#about" className="hover:text-indigo-600 transition">About</a></li>
          <li><a href="#contact" className="hover:text-indigo-600 transition">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Welcome to My App
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Built with Next.js, React, and Tailwind CSS. Deployed on Vercel for blazing fast performance.
          </p>
          
          {/* Features Grid */}
          <div id="features" className="grid md:grid-cols-3 gap-6 my-16">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold text-lg mb-2">Fast</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Optimized for performance</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="font-semibold text-lg mb-2">Modern</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Beautiful UI with Tailwind</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="font-semibold text-lg mb-2">Deployed</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Live on Vercel</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md">
              Get Started
            </button>
            <button className="px-8 py-3 bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border-2 border-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 dark:hover:bg-slate-700 transition">
              Learn More
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-gray-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2026 Ulagan. All rights reserved. Built with Next.js & Deployed on Vercel.</p>
        </div>
      </footer>
    </div>
  );
}
