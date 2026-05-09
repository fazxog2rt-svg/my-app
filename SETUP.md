# 🚀 Quick Setup Guide - Ulagan

## 📋 Features Included

### ✅ Authentication System
- **NextAuth.js v4** with GitHub OAuth
- Secure session management
- Protected routes
- Sign in with GitHub or email/password
- Two-factor authentication support

### ✅ E-Commerce Features
- **Product Search & Filtering**
  - Real-time search with regex matching
  - Category filtering
  - Sort by price, name, rating
- **Shopping Cart**
  - Add/remove/update items
  - Real-time calculations
  - Tax calculation (10%)
  - Coupon application
- **Product Reviews & Ratings**
  - 1-5 star reviews
  - Average rating calculation
  - Review submission and display

### ✅ Advanced Features
- **Wishlist System** - Save items for later
- **Loyalty Program** - Earn points, unlock levels and benefits
- **Referral Program** - Share and earn rewards
- **Coupon System** - Apply discount codes (WELCOME10, SAVE20, FLAT50)
- **Messaging System** - Send and receive messages
- **Blog Comments** - Comment on blog posts

### ✅ Dashboard & Analytics
- **User Dashboard** with order history and stats
- **Admin Panel** for system management
- **Analytics** - Real-time metrics and data
- **Loyalty Dashboard** - Points and membership info

### ✅ Additional Features
- **User Profile Management**
- **Notification System** with toast alerts
- **Email Notifications** (template system)
- **Order Management** with status tracking
- **Session-based Features** with auth validation

---

## 🔧 Setup Instructions

### Step 1: Clone & Install

```bash
# Clone the repository
git clone <repository-url>
cd ulagan

# Install dependencies
npm install
```

### Step 2: Environment Configuration

1. Create `.env.local` file:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` and set required variables:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generated-secret>
GITHUB_ID=<your-github-app-id>
GITHUB_SECRET=<your-github-app-secret>
```

### Step 3: Generate NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

Copy the output and paste into `NEXTAUTH_SECRET` in `.env.local`

### Step 4: Setup GitHub OAuth (Optional)

1. Go to: https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: Ulagan
   - **Homepage URL**: http://localhost:3000
   - **Authorization callback URL**: http://localhost:3000/api/auth/callback/github
4. Copy **Client ID** and **Client Secret**
5. Paste into `.env.local`

### Step 5: Run Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

---

## 🎯 Key Features to Try

### 1. Authentication
- **GitHub Login**: Click "Login with GitHub"
- **Email Login**: Use demo credentials:
  - Admin: `admin@ulagan.com` / `admin123`
  - User: `user@ulagan.com` / `user123`

### 2. Shopping (`/shop`)
- Search products in real-time
- Filter by category
- Sort by price or rating
- Add items to cart

### 3. Cart & Checkout (`/cart`)
- Review items
- Update quantities
- Apply coupons: `WELCOME10` (10% off), `SAVE20` (20% off), `FLAT50` ($50 off)
- Proceed to checkout

### 4. Wishlist (`/wishlist`)
- After login, save products
- View all saved items
- Move items to cart
- Remove items

### 5. Loyalty Program (`/loyalty`)
- View points and level
- See membership benefits
- Check progress to next level
- Unlock discounts and free shipping

### 6. Referral Program (`/referral`)
- Generate unique referral code
- Share via social media
- Track referrals and earnings
- Copy referral link

### 7. Messages (`/messages`)
- Send messages to other users
- View message history
- Mark messages as read
- See unread count

### 8. Dashboard (`/dashboard`)
- View order history
- See analytics and stats
- Quick action links
- Account overview

---

## 📍 All Available Routes

| Route | Purpose | Auth Required |
|-------|---------|---|
| `/` | Home page | No |
| `/shop` | Browse & search products | No |
| `/login` | Login page | No |
| `/signup` | Sign up page | No |
| `/cart` | Shopping cart | No |
| `/dashboard` | User dashboard | Yes |
| `/profile` | User profile | Yes |
| `/wishlist` | Saved items | Yes |
| `/loyalty` | Loyalty program | Yes |
| `/messages` | Inbox & messaging | Yes |
| `/referral` | Referral program | Yes |
| `/admin` | Admin panel | Yes (admin) |
| `/blog` | Blog posts | No |
| `/about` | About page | No |
| `/contact` | Contact form | No |

---

## 🔐 Authentication Flow

### GitHub OAuth
```
User clicks Login → GitHub auth page → Grant permissions → 
Session created → Redirected to dashboard
```

### Email/Password
```
Enter credentials → Verify against demo users → 
Session created → Redirected to dashboard
```

### Session Management
- JWT-based tokens
- 30-day expiration
- Secure cookie storage
- Auto-refresh capability

---

## 💳 Demo Coupons

| Code | Discount | Min Order | Uses |
|------|----------|-----------|------|
| WELCOME10 | 10% off | $0 | Unlimited |
| SAVE20 | 20% off | $100 | 50 uses |
| FLAT50 | $50 off | $200 | 30 uses |

Test at checkout in `/cart`

---

## 📊 Loyalty Levels

| Level | Spent | Discount | Perks |
|-------|-------|----------|-------|
| Bronze | $0-$999 | 5% | Basic member |
| Silver | $1000-$2999 | 10% | Better discounts |
| Gold | $3000-$4999 | 15% | Free shipping + support |
| Platinum | $5000+ | 20% | VIP benefits + priority |

---

## 🛠️ API Routes

### Core APIs
- `GET /api/products/search` - Search products
- `POST/GET /api/orders` - Orders management
- `POST/GET /api/wishlist` - Wishlist management
- `POST/GET /api/reviews` - Product reviews
- `POST/GET /api/coupons` - Coupon validation

### Advanced APIs
- `POST/GET /api/loyalty` - Loyalty points
- `POST/GET/PATCH /api/messages` - Messaging
- `POST/GET /api/referral` - Referral program
- `POST/GET/DELETE /api/blog-comments` - Blog comments
- `POST/GET /api/email` - Email notifications
- `POST/GET /api/two-factor` - 2FA setup
- `GET /api/analytics` - Analytics data

See [API_DOCS.md](./API_DOCS.md) for complete API reference.

---

## 🎨 Tech Stack

- **Frontend**: Next.js 16 with App Router
- **Authentication**: NextAuth.js 4.24.7
- **State Management**: Zustand 4.4.7
- **Styling**: Tailwind CSS 4
- **Database**: In-memory (ready for PostgreSQL/MongoDB)
- **Language**: TypeScript

---

## 📁 Project Structure

```
ulagan/
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/               # Authentication
│   │   ├── blog-comments/      # Blog comments
│   │   ├── coupons/            # Coupon validation
│   │   ├── email/              # Email system
│   │   ├── loyalty/            # Loyalty program
│   │   ├── messages/           # Messaging
│   │   ├── orders/             # Orders
│   │   ├── products/           # Products
│   │   ├── referral/           # Referral program
│   │   ├── reviews/            # Reviews
│   │   ├── two-factor/         # 2FA
│   │   ├── wishlist/           # Wishlist
│   │   └── analytics/          # Analytics
│   ├── (pages)/                # Page routes
│   │   ├── about/
│   │   ├── admin/
│   │   ├── blog/
│   │   ├── cart/
│   │   ├── contact/
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── loyalty/
│   │   ├── messages/
│   │   ├── profile/
│   │   ├── referral/
│   │   ├── shop/
│   │   ├── signup/
│   │   └── wishlist/
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx
├── components/                 # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ProductSearch.tsx
├── lib/
│   ├── store.ts               # Zustand stores
│   ├── constants.ts           # Demo data
│   └── notifications.tsx      # Notification system
├── types/
│   └── index.ts               # TypeScript types
├── public/                    # Static assets
├── .env.local                 # Environment variables
├── .env.example               # Example template
├── package.json
├── tsconfig.json
├── FEATURES.md                # Complete features docs
├── API_DOCS.md               # API reference
└── README.md
```

---

## 🚀 Running the App

### Development

```bash
npm run dev
```

Open http://localhost:3000

### Production Build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

---

## 📚 Documentation

- [FEATURES.md](./FEATURES.md) - Complete features overview
- [API_DOCS.md](./API_DOCS.md) - API reference guide
- [README.md](./README.md) - Project overview

---

## 🔒 Security Notes

✅ Session-based authentication
✅ JWT token validation
✅ Protected API routes
✅ OAuth 2.0 integration
✅ Password hashing support
✅ CORS configured
✅ Two-factor auth support

For production, add:
- [ ] Real database encryption
- [ ] Rate limiting
- [ ] HTTPS only
- [ ] Secure headers
- [ ] API key management
- [ ] Audit logging

---

## ⚡ Performance Tips

1. **Images**: Next.js auto-optimizes
2. **Caching**: Implement revalidation
3. **Database**: Add real DB for better performance
4. **CDN**: Use for static assets
5. **Monitoring**: Set up error tracking

---

## 🐛 Troubleshooting

### Port 3000 in use
```bash
npm run dev -- -p 3001
```

### Module not found
```bash
rm -rf node_modules
npm install
npm run dev
```

### Build errors
```bash
npm run build
```

### Session issues
- Clear browser cookies
- Check `.env.local` variables
- Restart dev server

### GitHub login not working
- Verify Client ID/Secret in `.env.local`
- Check OAuth app callback URL
- Ensure NEXTAUTH_URL matches

---

## 📦 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel login
vercel deploy
```

### Railway

```bash
npm i -g @railway/cli
railway login
railway up
```

### Render / AWS / Digital Ocean

1. Connect GitHub repo
2. Configure build: `npm run build`
3. Start: `npm run start`
4. Add env variables
5. Deploy

---

## 💡 Next Steps

1. ✅ Complete setup
2. ✅ Test with demo accounts
3. ✅ Explore all features
4. 📝 Customize colors/branding
5. 🗄️ Connect to real database
6. 💳 Setup payment gateway
7. 📧 Configure email service
8. 🚀 Deploy to production

---

## 🤝 Support

- 📖 Read documentation files
- 🐛 Check GitHub issues
- 💬 Email: support@ulagan.com

---

## 📄 License

MIT License - Free to use and modify

---

Happy coding! 🎉

### Session Hook
```tsx
const { data: session } = useSession();
if (!session) redirect('/login');
```

---

## 🐛 Troubleshooting

### Issue: "GitHub login not working"
**Solution**: 
- Check GITHUB_ID and GITHUB_SECRET are correct
- Verify callback URL: `http://localhost:3000/api/auth/callback/github`
- Ensure NEXTAUTH_URL is set

### Issue: "Session lost after refresh"
**Solution**:
- Make sure NEXTAUTH_SECRET is set in .env.local
- Check SessionProvider is in layout.tsx

### Issue: "Can't add to cart"
**Solution**:
- Zustand store requires browser environment
- Make sure you're on a client component ('use client')

### Issue: "API routes not responding"
**Solution**:
- Check server is running: `npm run dev`
- Verify route names in /app/api/
- Check console for errors

---

## 📚 Next Steps

1. **Test all features**:
   - Login with GitHub
   - Browse shop
   - Add products to cart
   - Checkout
   - View dashboard

2. **Customize for your needs**:
   - Update branding
   - Add more products
   - Customize colors/themes
   - Add more pages

3. **Deploy**:
   - Deploy to Vercel (recommended for Next.js)
   - Set environment variables in Vercel dashboard
   - Update GitHub OAuth callback URL

---

## 📖 Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

---

## 💡 Tips

- Use `npm run dev` for development
- Check browser console for errors
- Use NextAuth.js callbacks for custom logic
- Update .env.local for different environments
- Test with demo credentials first

---

**Happy coding! 🚀**
