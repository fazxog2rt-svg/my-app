# 🎯 Developer Quick Reference - Ulagan

## 🚀 Quick Commands

```bash
# Development
npm run dev                    # Start dev server (http://localhost:3000)
npm run build                  # Production build
npm run start                  # Run production build
npm run lint                   # Check code quality

# Environment
openssl rand -base64 32       # Generate NEXTAUTH_SECRET
cp .env.example .env.local    # Setup environment
```

## 🔑 Key Files to Know

### Core Files
- `app/layout.tsx` - Root layout with SessionProvider
- `app/page.tsx` - Home page
- `app/providers.tsx` - NextAuth provider wrapper
- `lib/store.ts` - Zustand state stores (cart, loyalty, etc.)
- `types/index.ts` - TypeScript interfaces for all entities
- `lib/constants.ts` - Demo products and categories

### Authentication
- `app/api/auth/[...nextauth]/route.ts` - NextAuth config
- `app/login/page.tsx` - Login page
- `app/signup/page.tsx` - Sign up page

### E-Commerce Pages
- `app/shop/page.tsx` - Product browse & search
- `app/cart/page.tsx` - Shopping cart with checkout
- `app/orders/page.tsx` - Order history (in dashboard)

### Advanced Features Pages
- `app/wishlist/page.tsx` - Saved items
- `app/loyalty/page.tsx` - Points & membership
- `app/messages/page.tsx` - Messaging inbox
- `app/referral/page.tsx` - Referral program

### API Routes
- `/api/products/search` - Search & filter products
- `/api/orders` - Create & retrieve orders
- `/api/wishlist` - Wishlist CRUD
- `/api/reviews` - Product reviews
- `/api/coupons` - Coupon validation
- `/api/loyalty` - Loyalty points
- `/api/messages` - Messaging system
- `/api/referral` - Referral program
- `/api/blog-comments` - Blog comments
- `/api/email` - Email notifications
- `/api/two-factor` - 2FA setup
- `/api/analytics` - Analytics data

## 🔐 Authentication

### Session Hook
```typescript
import { useSession } from 'next-auth/react';

export default function Component() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') return <div>Loading...</div>;
  if (!session) return <div>Not authenticated</div>;
  
  return <div>Hello {session.user.email}</div>;
}
```

### Protected Redirect
```typescript
'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function ProtectedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status]);
  
  return <div>Protected content</div>;
}
```

### Server-Side Session
```typescript
import { getServerSession } from 'next-auth';

export async function POST(request: Request) {
  const session = await getServerSession();
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Authenticated logic
}
```

## 📦 State Management

### Using Zustand Stores
```typescript
// Cart store
import { useCartStore } from '@/lib/store';

export default function Component() {
  const { items, addItem, removeItem } = useCartStore();
  
  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          {item.name} - ${item.price}
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
```

### All Available Stores
- `useCartStore` - Shopping cart
- `useWishlistStore` - Wishlist items
- `useLoyaltyStore` - Loyalty points
- `useMessageStore` - Messages
- `useAuthStore` - Auth state (legacy)
- `useNotificationStore` - Toast notifications

## 🎨 Styling Patterns

### Dark Mode
```tsx
<div className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white">
  Content
</div>
```

### Responsive
```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols */}
</div>
```

### Buttons
```tsx
<button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
  Click me
</button>
```

### Cards
```tsx
<div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
  Card content
</div>
```

## 🔍 Common Tasks

### Add to Cart
```typescript
const { addItem } = useCartStore();

addItem({
  id: product.id,
  name: product.name,
  price: product.price,
  quantity: 1,
  image: product.image
});
```

### Apply Coupon
```typescript
const response = await fetch('/api/coupons', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    code: 'WELCOME10',
    orderTotal: 150
  })
});

const data = await response.json();
console.log(`Discount: $${data.discount}`);
console.log(`Final total: $${data.finalTotal}`);
```

### Get Loyalty Points
```typescript
const response = await fetch('/api/loyalty');
const data = await response.json();

console.log(`Points: ${data.loyalty.points}`);
console.log(`Level: ${data.loyalty.level}`);
console.log(`Benefits: ${JSON.stringify(data.loyalty.levelBenefits)}`);
```

### Send Message
```typescript
const response = await fetch('/api/messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    toUserId: 'friend@example.com',
    content: 'Hello!'
  })
});
```

### Generate Referral Code
```typescript
const response = await fetch('/api/referral', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ action: 'generate' })
});

const data = await response.json();
console.log(`Referral code: ${data.referralCode}`);
console.log(`Share link: ${data.referralLink}`);
```

## 🧪 Testing Demo Scenarios

### Scenario 1: Full Purchase
```
1. Go to /login
2. Login with user@ulagan.com / user123
3. Go to /shop
4. Search and add items to cart
5. Go to /cart
6. Apply coupon: WELCOME10
7. Checkout
8. Go to /loyalty to see earned points
```

### Scenario 2: Referral
```
1. Login at /login
2. Go to /referral
3. Click "Generate Code"
4. Copy referral link
5. Share on social
6. View stats
```

### Scenario 3: Messaging
```
1. Login
2. Go to /messages
3. Enter recipient: admin@ulagan.com
4. Type message
5. Click Send
6. See message in list
```

### Scenario 4: Wishlist
```
1. Login
2. Go to /shop
3. Click heart icon to save
4. Go to /wishlist
5. View saved items
6. Move to cart or remove
```

## 📝 TypeScript Types

### Key Interfaces
```typescript
interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  role: 'user' | 'admin';
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  image: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: Date;
}

interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: Date;
}

interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxUses: number;
  currentUses: number;
  expiresAt: Date;
  minOrderValue: number;
  active: boolean;
}
```

## 🔗 API Response Pattern

### Success
```json
{
  "success": true,
  "data": { /* ... */ },
  "message": "Operation successful"
}
```

### Error
```json
{
  "error": "Error message",
  "status": 400
}
```

## 🚨 Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| 401 Unauthorized | Not authenticated | Login first |
| 404 Not Found | Resource missing | Check ID/path |
| 400 Bad Request | Invalid data | Verify input |
| NextAuth Error | Missing env vars | Check .env.local |
| Port 3000 in use | Port conflict | Use `-p 3001` flag |

## 📱 Mobile Testing

```bash
# Test on mobile
npm run dev
# Access from mobile: http://<your-ip>:3000
```

### Responsive Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🎯 Performance Checklist

- [ ] Images optimized with Next.js Image
- [ ] Components lazy loaded
- [ ] State properly managed
- [ ] No console errors/warnings
- [ ] Mobile responsive
- [ ] Dark mode working
- [ ] Lighthouse score > 90

## 📚 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [NextAuth Docs](https://next-auth.js.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Docs](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)

## 🎪 Demo Data

### Demo Users
- `admin@ulagan.com` / `admin123`
- `user@ulagan.com` / `user123`

### Demo Coupons
- `WELCOME10` - 10% off
- `SAVE20` - 20% off (min $100)
- `FLAT50` - $50 off (min $200)

### Demo Products
- Premium Laptop ($1299)
- Wireless Headphones ($199)
- Smart Watch ($299)
- USB-C Cable ($29)

### Demo Categories
- Electronics
- Fashion
- Books
- Home & Garden

## 🎓 Learning Paths

### Beginner
1. Read SETUP.md
2. Run the app
3. Login with demo account
4. Browse and test features
5. Read FEATURES.md

### Intermediate
1. Review API_DOCS.md
2. Study API route structure
3. Understand Zustand stores
4. Explore authentication flow
5. Read component code

### Advanced
1. Study database schema
2. Implement real database
3. Add payment processing
4. Setup email service
5. Deploy to production

---

**Last Updated**: 2024
**Status**: Production Ready ✅
