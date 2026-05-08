'use client';

import { useState } from 'react';

export default function About() {
  const [activeTab, setActiveTab] = useState('mission');

  const tabs = [
    { id: 'mission', label: 'Our Mission', content: 'To create innovative web solutions that empower businesses and individuals to achieve their goals through cutting-edge technology.' },
    { id: 'vision', label: 'Our Vision', content: 'To be the leading provider of modern web applications, setting new standards for user experience and technological excellence.' },
    { id: 'values', label: 'Our Values', content: 'Innovation, Quality, Customer Satisfaction, Continuous Learning, and Community Contribution.' },
    { id: 'team', label: 'Our Team', content: 'A passionate team of developers, designers, and strategists working together to build amazing digital experiences.' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          About Ulagan
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
          Learn more about our company and what drives us
        </p>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Building the Future of Web</h2>
              <p className="text-indigo-100 mb-6">
                Since 2026, we've been at the forefront of web development, creating innovative solutions
                that help businesses thrive in the digital age.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm text-indigo-200">Projects</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">100+</div>
                  <div className="text-sm text-indigo-200">Clients</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">5</div>
                  <div className="text-sm text-indigo-200">Years</div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-8xl mb-4">🚀</div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow mb-12">
          <div className="border-b border-gray-200 dark:border-slate-700">
            <nav className="flex">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition ${
                    activeTab === tab.id
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="p-6">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              {tabs.find(tab => tab.id === activeTab)?.content}
            </p>
          </div>
        </div>

        {/* Services */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Web Development</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Custom web applications built with modern technologies and best practices.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Mobile Apps</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Native and cross-platform mobile applications for iOS and Android.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">UI/UX Design</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Beautiful and intuitive user interfaces that enhance user experience.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Work Together?</h2>
          <p className="text-green-100 mb-6">
            Let's discuss your project and see how we can help you achieve your goals.
          </p>
          <a href="/contact" className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition">
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
