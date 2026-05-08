# 🚀 Ulagan - Advanced Full-Stack Web Application

A modern, production-ready web application built with Next.js 16, React 19, TypeScript, Tailwind CSS, and NextAuth.js featuring comprehensive authentication, e-commerce, blogging, and admin capabilities.

## ✨ Features Implemented

### 🔐 Authentication & Security
- **GitHub OAuth Integration** - Sign in with GitHub account
- **Credentials Authentication** - Traditional email/password login
- **NextAuth.js v4** - Secure session management with JWT
- **Protected Routes** - Automatic redirect to login for authenticated pages
- **Session Persistence** - Secure token-based sessions

### 🛍️ E-Commerce Platform
- **Product Search & Filtering**
  - Real-time search by product name and description
  - Category-based filtering
  - Multiple sort options (name, price, rating)
  - Dynamic filter UI

- **Shopping Cart**
  - Add/remove products
  - Update quantity
  - Real-time price calculations
  - Tax calculations (10%)
  - Free shipping
  - Session-based cart persistence

- **Checkout & Orders**
  - One-click checkout
  - Order confirmation
  - Order history tracking
  - Order status management

### 📊 Dashboard & Analytics
- **User Dashboard**
  - Real-time analytics
  - Order history with detailed information
  - Account statistics
  - User profile management

- **Admin Panel**
  - Complete system overview
  - Product management interface
  - User and order management UI
  - Analytics and metrics display

### 👤 User Profile Management
- **Profile Information**
  - View and edit personal details
  - Avatar display with fallback
  - Account status indicator
  - Member since date

- **Order History**
  - View past orders
  - Order status tracking
  - Order totals and dates
  - Quick navigation to dashboard

### 🔔 Notification System
- **Toast Notifications**
  - Success, error, warning, info types
  - Auto-dismiss functionality
  - Custom duration support
  - Global notification container

### 🛠️ Technical Stack
- **Framework**: Next.js 16.2.5
- **Language**: TypeScript 5
- **Runtime**: React 19.2.4
- **Authentication**: NextAuth.js 4.24.7
- **State Management**: Zustand 4.4.7
- **Styling**: Tailwind CSS 4
- **HTTP Client**: Axios 1.6.5
- **ORM**: Prisma 5.8.0 (ready for setup)
- **Database**: PostgreSQL/MySQL (ready for setup)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Git
- GitHub account (for OAuth)

### Installation

1. **Clone the Repository**
```bash
cd my-app
```

2. **Install Dependencies**
```bash
npm install
```

3. **Setup Environment Variables**
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-change-in-production

# GitHub OAuth (Get from https://github.com/settings/developers)
GITHUB_ID=your_github_app_id
GITHUB_SECRET=your_github_app_secret

# Optional - Future Database Setup
# DATABASE_URL=postgresql://user:password@localhost:5432/ulagan
```

### Setting Up GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the details:
   - Application name: `Ulagan`
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy your Client ID and Client Secret into `.env.local`

### Running the Application

```bash
# Development Server
npm run dev

# Production Build
npm run build
npm start

# Linting
npm run lint
```

Visit `http://localhost:3000` in your browser.

## 🔐 Demo Credentials

For testing without GitHub OAuth:

```
Email: admin@ulagan.com
Password: admin123
Role: Admin

Email: user@ulagan.com
Password: user123
Role: User
```

## 📁 Project Structure

```
my-app/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/    # NextAuth configuration
│   │   ├── products/              # Product API routes
│   │   ├── orders/                # Order management
│   │   └── analytics/             # Analytics data
│   ├── admin/                     # Admin dashboard
│   ├── blog/                      # Blog pages
│   ├── cart/                      # Shopping cart
│   ├── dashboard/                 # User dashboard
│   ├── login/                     # Login page
│   ├── profile/                   # User profile
│   ├── shop/                      # Product shop
│   ├── signup/                    # Sign up page
│   ├── layout.tsx                 # Root layout with SessionProvider
│   └── page.tsx                   # Home page
├── components/
│   ├── Header.tsx                 # Navigation with auth
│   ├── Footer.tsx                 # Footer
│   └── ProductSearch.tsx          # Search & filter component
├── lib/
│   ├── constants.ts               # Demo data and constants
│   ├── store.ts                   # Zustand stores
│   ├── notifications.tsx          # Notification system
│   └── types/                     # TypeScript types
├── public/                        # Static assets
└── types/
    └── index.ts                   # Global types
```

## 🎯 Key Features Usage

### Using Product Search
```typescript
// In shop page
<ProductSearch onSearch={handleSearch} />

// Filter products
const handleSearch = async (filters) => {
  const res = await fetch(`/api/products/search?${params}`);
  const { products } = await res.json();
}
```

### Adding to Cart
```typescript
import { useCartStore } from '@/lib/store';

const { addItem } = useCartStore();
addItem({ productId: '1', quantity: 1, price: 99.99 });
```

### Using Notifications
```typescript
import { useNotification } from '@/lib/notifications';

const { addNotification } = useNotification();
addNotification('Product added!', 'success', 3000);
```

### Getting Session Data
```typescript
import { useSession } from 'next-auth/react';

const { data: session } = useSession();
// Access: session?.user?.email, session?.user?.name
```

## 📊 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/search?search=&category=&sort=` - Search & filter products

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders (requires auth)

### Analytics
- `GET /api/analytics` - Get system analytics

### Authentication
- `POST /api/auth/signin` - Sign in
- `POST /api/auth/callback/github` - GitHub OAuth callback
- `GET /api/auth/session` - Get current session

## 🔄 State Management

### Cart Store (Zustand)
```typescript
const { items, addItem, removeItem, updateQuantity, clearCart } = useCartStore();
```

### Auth Store (Zustand)
```typescript
const { user, setUser, logout } = useAuthStore();
```

### Notifications Hook
```typescript
const { notifications, addNotification, removeNotification } = useNotification();
```

## 🎨 UI/UX Features

- **Dark Mode Support** - Full dark theme with Tailwind
- **Responsive Design** - Mobile, tablet, and desktop optimized
- **Smooth Animations** - Hover effects and transitions
- **Loading States** - Skeleton and loading indicators
- **Error Handling** - User-friendly error messages
- **Toast Notifications** - Non-intrusive feedback system

## 🔮 Future Enhancements

- [ ] Database Integration (Prisma + PostgreSQL)
- [ ] User Authentication with email verification
- [ ] Admin user role management
- [ ] Payment integration (Stripe)
- [ ] Product image uploads
- [ ] Blog comment system
- [ ] Email notifications
- [ ] Real-time chat support
- [ ] Wishlist feature
- [ ] Product reviews & ratings
- [ ] Inventory management
- [ ] Order tracking

## 🐛 Troubleshooting

### GitHub OAuth Not Working
- Verify GITHUB_ID and GITHUB_SECRET in `.env.local`
- Check callback URL matches exactly: `http://localhost:3000/api/auth/callback/github`
- Ensure NEXTAUTH_URL is set correctly

### Session Lost on Page Refresh
- Make sure `.env.local` has NEXTAUTH_SECRET set
- Check that SessionProvider wraps entire app in layout.tsx

### Products Not Showing in Shop
- API route `/api/products` should return product list
- Check browser console for API errors

## 📝 License

MIT License - feel free to use for personal and commercial projects.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ using Next.js 16 and modern web technologies**
