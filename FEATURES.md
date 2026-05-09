# Ulagan E-Commerce Platform - Features & APIs

## Overview

Ulagan is a comprehensive e-commerce platform built with Next.js 16, featuring advanced features like authentication, product management, orders, wishlists, loyalty programs, referrals, messaging, and more.

## Core Features

### 1. Authentication
- **Framework**: NextAuth.js 4.24.7
- **Providers**:
  - GitHub OAuth 2.0 (requires GITHUB_ID, GITHUB_SECRET)
  - Email/Password credentials with demo users
- **Session Management**: JWT-based with 30-day expiration
- **Protected Routes**: Automatic redirects to /login for unauthorized access

**Demo Credentials**:
- Admin: admin@ulagan.com / admin123
- User: user@ulagan.com / user123

### 2. Product Management
- **Search & Filtering**: Real-time search with regex-based text matching
- **Categories**: Electronics, Fashion, Books, Home & Garden
- **Sorting**: By name, price (low-high, high-low), rating
- **Endpoint**: `GET /api/products/search`

**Query Parameters**:
```javascript
{
  search: string,      // Product name/description
  category: string,    // Filter by category
  sort: string         // name | price-low | price-high | rating
}
```

### 3. Shopping Cart
- **Features**:
  - Add/remove items
  - Update quantities
  - Calculate totals with tax (10%)
  - Free shipping
  - Session-aware (filtered by user email)
- **State Management**: Zustand store (useCartStore)

### 4. Orders
- **Endpoint**: `POST/GET /api/orders`
- **Features**:
  - Order creation with session validation
  - Automatic order history filtering by user email
  - Tax calculation (10%)
  - Order status tracking
- **Response**:
```javascript
{
  id: string,
  userId: string,
  items: CartItem[],
  subtotal: number,
  tax: number,
  total: number,
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered',
  createdAt: Date
}
```

## Advanced Features

### 5. Wishlist System
- **Endpoint**: `POST/GET/DELETE /api/wishlist`
- **Features**:
  - Add products to wishlist
  - Retrieve user's wishlist
  - Remove items from wishlist
  - Session-aware storage
- **UI Page**: `/wishlist`
- **Response**:
```javascript
{
  id: string,
  productId: string,
  productName: string,
  productPrice: number,
  productImage: string,
  userId: string,
  addedAt: Date
}
```

### 6. Product Reviews & Ratings
- **Endpoint**: `POST/GET /api/reviews`
- **Features**:
  - Submit reviews with 1-5 star rating
  - View product reviews
  - Automatic average rating calculation
  - Review counts per product
- **Validation**: Rating must be between 1-5
- **Response**:
```javascript
{
  reviews: [{
    id: string,
    productId: string,
    userId: string,
    rating: number,
    title: string,
    comment: string,
    createdAt: Date
  }],
  averageRating: number,
  totalReviews: number
}
```

### 7. Coupon System
- **Endpoint**: `POST/GET /api/coupons`
- **Features**:
  - Validate coupon codes
  - Percentage-based discounts
  - Fixed amount discounts
  - Usage limit tracking
  - Expiry date validation
  - Minimum order value requirements
- **Demo Coupons**:
  - WELCOME10: 10% off, unlimited use, expires 2026-12-31
  - SAVE20: 20% off, min $100, 50 uses available
  - FLAT50: $50 fixed, min $200, 2 uses available

**POST Request**:
```javascript
{
  code: string,
  orderTotal: number
}
```

**Response**:
```javascript
{
  success: true,
  coupon: string,
  discountType: 'percentage' | 'fixed',
  discountValue: number,
  discount: number,
  finalTotal: number
}
```

### 8. Loyalty Points Program
- **Endpoint**: `POST/GET /api/loyalty`
- **Features**:
  - Earn 1 point per $1 spent
  - Level-based membership system
  - Automatic level upgrades
  - Level-specific benefits (discounts, free shipping, priority support)
  - Redeem points for discounts
- **Levels**:
  - Bronze: $0-$999 (5% discount)
  - Silver: $1000-$2999 (10% discount)
  - Gold: $3000-$4999 (15% discount + free shipping)
  - Platinum: $5000+ (20% discount + free shipping + priority support)

**POST Actions**:
```javascript
{
  orderTotal: number,
  action: 'addOrder' | 'redeem'
}
```

**Response**:
```javascript
{
  success: true,
  loyalty: {
    points: number,
    level: string,
    totalSpent: number,
    levelBenefits: {
      discount: string,
      freeShipping: boolean,
      priority: boolean
    },
    nextLevelAt: {
      level: string,
      amount: number
    }
  }
}
```

### 9. Messaging/Inbox System
- **Endpoint**: `POST/GET/PATCH /api/messages`
- **Features**:
  - Send messages between users
  - View received/sent messages
  - Retrieve conversation threads
  - Mark messages as read
  - Track unread count
- **UI Page**: `/messages`

**Endpoints**:
- `POST`: Send message
  ```javascript
  { toUserId: string, content: string }
  ```
- `GET`: Retrieve messages
  ```javascript
  ?type=received|sent|conversation&with=userId
  ```
- `PATCH`: Mark as read
  ```javascript
  { messageId: string }
  ```

### 10. Referral Program
- **Endpoint**: `POST/GET /api/referral`
- **Features**:
  - Generate unique referral codes
  - Redeem referral codes
  - Track referral statistics
  - Earn rewards per referral ($5 per successful referral)
  - Referral link generation for social sharing
- **UI Page**: `/referral`

**Actions**:
```javascript
// Generate code
{ action: 'generate' }

// Redeem code
{ action: 'redeem', referralCode: string, referredUserId: string }
```

**Response**:
```javascript
{
  success: true,
  referralCode: string,
  referrals: string[],
  totalReferrals: number,
  totalBonus: number,
  totalEarned: number,
  referralLink: string
}
```

### 11. Blog Comments System
- **Endpoint**: `POST/GET/PATCH/DELETE /api/blog-comments`
- **Features**:
  - Post comments on blog posts
  - View comments per post
  - Like comments
  - Delete own comments
  - User verification
- **Validation**: Comments cannot be empty

**Endpoints**:
- `POST`: Post comment
  ```javascript
  { postId: string, content: string }
  ```
- `GET`: Get comments
  ```javascript
  ?postId=string
  ```
- `PATCH`: Like comment
  ```javascript
  { commentId: string, action: 'like' }
  ```
- `DELETE`: Delete comment
  ```javascript
  { commentId: string }
  ```

### 12. Email Notifications
- **Endpoint**: `POST/GET /api/email`
- **Features**:
  - Email template system
  - Multiple email types:
    - Order confirmation
    - Order shipped
    - Order delivered
    - Promotional offers
    - Account notifications
    - Abandoned cart reminders

**Email Types**:
```javascript
{
  emailType: 'orderConfirmation' | 'orderShipped' | 'orderDelivered' | 'promotionalOffer' | 'accountNotification' | 'abandonedCart',
  data: any
}
```

### 13. Two-Factor Authentication
- **Endpoint**: `POST/GET /api/two-factor`
- **Features**:
  - TOTP-based authentication
  - Backup codes generation
  - QR code generation for authenticator apps
  - Backup code verification
  - Enable/disable 2FA

**Actions**:
```javascript
{
  action: 'setup' | 'verify' | 'verify-backup' | 'disable',
  method: 'email' | 'authenticator',
  code: string,
  backupCode: string
}
```

### 14. Analytics Dashboard
- **Endpoint**: `GET /api/analytics`
- **Features**:
  - Total users count
  - Total orders count
  - Total revenue calculation
  - Conversion rate tracking
  - Real-time metrics

## User Interface Pages

### Authenticated Users
- **Dashboard** (`/dashboard`): Real-time analytics and order history
- **Profile** (`/profile`): User information and profile management
- **Shop** (`/shop`): Browse and search products
- **Cart** (`/cart`): Shopping cart with checkout
- **Wishlist** (`/wishlist`): Saved items for later
- **Loyalty** (`/loyalty`): Points and membership benefits
- **Messages** (`/messages`): Inbox and conversations
- **Referral** (`/referral`): Referral program and earnings
- **Admin** (`/admin`): Product and order management (admin only)

### Public Pages
- **Home** (`/`): Landing page
- **About** (`/about`): Company information
- **Blog** (`/blog`): Blog posts
- **Contact** (`/contact`): Contact form
- **Login** (`/login`): Authentication
- **Signup** (`/signup`): New account creation

## State Management

### Zustand Stores
- **useCartStore**: Cart items, quantities, totals
- **useAuthStore**: User authentication state (legacy, now using NextAuth)
- **useWishlistStore**: Wishlist items management
- **useLoyaltyStore**: Loyalty points and level
- **useMessageStore**: Messages and conversations
- **useNotificationStore**: Toast notifications

## Environment Configuration

Create `.env.local` in the project root:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generated-secret>
GITHUB_ID=<your-github-oauth-id>
GITHUB_SECRET=<your-github-oauth-secret>
```

Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

## API Response Structure

All API responses follow a consistent structure:

**Success Response**:
```javascript
{
  success: true,
  data: any,
  message: string
}
```

**Error Response**:
```javascript
{
  error: string,
  status: number
}
```

## Styling & UI

- **Framework**: Tailwind CSS 4
- **Dark Mode**: Full support with `dark:*` utilities
- **Responsive**: Mobile-first design (md:, lg:, xl: breakpoints)
- **Color Scheme**: Indigo/purple base with accessible contrast ratios

## Security Features

- ✓ Session-based access control
- ✓ User email verification
- ✓ CORS headers configured
- ✓ JWT token validation
- ✓ Protected API routes
- ✓ OAuth 2.0 integration
- ✓ Two-factor authentication support

## Getting Started

1. **Clone the repository**
```bash
git clone <repo-url>
cd ulagan
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

4. **Run development server**
```bash
npm run dev
```

5. **Open in browser**
```
http://localhost:3000
```

## Testing Demo Features

1. **Login** with demo credentials:
   - Email: admin@ulagan.com / user@ulagan.com
   - Password: admin123 / user123

2. **Browse products** in Shop

3. **Add to cart and checkout**

4. **Test wishlist** by saving products

5. **View loyalty points** in Loyalty section

6. **Generate referral code** in Referral section

7. **Send messages** in Messages inbox

8. **Apply coupons** at checkout (use: WELCOME10, SAVE20, FLAT50)

## Deployment

Deploy to Vercel (recommended):

```bash
vercel deploy
```

Or use any Node.js hosting:
- Railway
- Render
- AWS Amplify
- Digital Ocean

## Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Real payment gateway (Stripe/PayPal)
- [ ] Email service integration (SendGrid/Resend)
- [ ] Real OAuth providers (Apple, Google)
- [ ] Inventory management
- [ ] Live chat support
- [ ] Advanced analytics
- [ ] Mobile app

## License

MIT License - Feel free to use this project!

## Support

For support, email support@ulagan.com or create an issue on GitHub.

---

**Built with ❤️ using Next.js**
