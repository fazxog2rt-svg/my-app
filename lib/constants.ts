export const APP_NAME = 'Ulagan';
export const APP_DESCRIPTION = 'A modern full-featured web application';

export const BLOG_CATEGORIES = [
  'Technology',
  'Business',
  'Lifestyle',
  'Tutorial',
  'News',
  'Other',
];

export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Fashion',
  'Home',
  'Sports',
  'Books',
  'Other',
];

export const DEMO_USERS = [
  {
    id: '1',
    email: 'admin@ulagan.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as const,
  },
  {
    id: '2',
    email: 'user@ulagan.com',
    password: 'user123',
    name: 'Regular User',
    role: 'user' as const,
  },
];

export const DEMO_PRODUCTS = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 79.99,
    category: 'Electronics',
    image: '🎧',
    stock: 50,
    rating: 4.5,
    description: 'High quality wireless headphones with noise cancellation',
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 199.99,
    category: 'Electronics',
    image: '⌚',
    stock: 30,
    rating: 4.8,
    description: 'Advanced smartwatch with health tracking',
  },
  {
    id: '3',
    name: 'Designer Sunglasses',
    price: 149.99,
    category: 'Fashion',
    image: '😎',
    stock: 25,
    rating: 4.3,
    description: 'Stylish and trendy designer sunglasses',
  },
  {
    id: '4',
    name: 'Coffee Maker',
    price: 89.99,
    category: 'Home',
    image: '☕',
    stock: 40,
    rating: 4.6,
    description: 'Automatic coffee maker with programmable timer',
  },
];

export const DEMO_BLOG_POSTS = [
  {
    id: '1',
    title: 'Getting Started with Next.js 16',
    slug: 'getting-started-nextjs-16',
    excerpt: 'Learn how to build modern web applications with Next.js 16',
    category: 'Tutorial',
    author: 'Admin',
    views: 1250,
    likes: 85,
  },
  {
    id: '2',
    title: 'The Future of Web Development',
    slug: 'future-of-web-dev',
    excerpt: 'Exploring upcoming trends and technologies in web development',
    category: 'Technology',
    author: 'Admin',
    views: 2100,
    likes: 145,
  },
];
