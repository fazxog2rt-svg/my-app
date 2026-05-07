import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 dark:bg-black text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">🚀 Ulagan</h3>
            <p className="text-sm text-gray-400">
              A modern full-featured web application built with Next.js and deployed on Vercel.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-white mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-indigo-400 transition">Home</Link></li>
              <li><Link href="/blog" className="hover:text-indigo-400 transition">Blog</Link></li>
              <li><Link href="/shop" className="hover:text-indigo-400 transition">Shop</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition">Documentation</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Support</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">API</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-white mb-4">Follow Us</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition">Twitter</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">GitHub</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {currentYear} Ulagan. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-indigo-400 transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-indigo-400 transition">Terms of Service</Link>
            <Link href="#" className="hover:text-indigo-400 transition">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
