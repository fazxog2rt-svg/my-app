# 🚀 Quick Setup Guide - Ulagan

## 📋 What's Been Added

### ✅ Authentication System
- **NextAuth.js v4** with GitHub OAuth
- Secure session management
- Protected routes
- Sign in with GitHub or email/password

### ✅ E-Commerce Features
- **Product Search & Filtering**
  - Real-time search
  - Category filtering
  - Sort by price, name, rating
- **Shopping Cart**
  - Add/remove/update items
  - Real-time calculations
  - Secure checkout

### ✅ Dashboard & Analytics
- **User Dashboard** with order history
- **Admin Panel** for system management
- Real-time analytics and statistics

### ✅ Additional Features
- **User Profile Management**
- **Notification System**
- **Order Management**
- **Session-based Features**

---

## 🔧 Setup Instructions

### Step 1: Environment Configuration

1. Copy the example environment file:
```bash
cp .env.local.example .env.local
```

2. Edit `.env.local` and set the required variables:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-a-random-secret-key-here
GITHUB_ID=your_github_app_id
GITHUB_SECRET=your_github_app_secret
```

### Step 2: Generate NEXTAUTH_SECRET

Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```
Copy the output and paste it into `NEXTAUTH_SECRET` in `.env.local`

### Step 3: Setup GitHub OAuth

1. Go to: https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in the form:
   - **Application name**: Ulagan
   - **Homepage URL**: http://localhost:3000
   - **Authorization callback URL**: http://localhost:3000/api/auth/callback/github
4. Copy **Client ID** and **Client Secret**
5. Paste them into `.env.local`:
```env
GITHUB_ID=your_client_id
GITHUB_SECRET=your_client_secret
```

### Step 4: Install & Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# Visit: http://localhost:3000
```

---

## 🎯 Key Features to Try

### 1. Login & Authentication
- **With GitHub**: Click "Login with GitHub" button
- **With Email**: Use demo credentials:
  - Email: `admin@ulagan.com` / Password: `admin123`
  - Email: `user@ulagan.com` / Password: `user123`

### 2. Product Search & Shopping
- Go to `/shop` page
- Try searching for products
- Filter by category
- Sort by price or rating
- Add items to cart
- Go to checkout

### 3. Dashboard
- After login, visit `/dashboard`
- View your order history
- See analytics and stats
- Quick navigation links

### 4. User Profile
- Click profile icon → "Profile"
- View account information
- Edit profile details
- View order history

### 5. Admin Panel
- Visit `/admin` page
- View system analytics
- Manage products
- See user and order data

---

## 📍 Important Routes

| Route | Purpose | Auth Required |
|-------|---------|---|
| `/` | Home page | No |
| `/shop` | Browse products | No |
| `/login` | Login page | No |
| `/signup` | Sign up page | No |
| `/cart` | Shopping cart | No |
| `/dashboard` | User dashboard | Yes |
| `/profile` | User profile | Yes |
| `/admin` | Admin panel | Yes |
| `/blog` | Blog posts | No |
| `/about` | About page | No |
| `/contact` | Contact page | No |

---

## 🔐 How Authentication Works

1. **GitHub OAuth Flow**:
   - User clicks "Login with GitHub"
   - Redirected to GitHub login
   - User grants permissions
   - Redirected back with auth token
   - Session created automatically

2. **Email/Password**:
   - User enters email and password
   - Credentials verified against demo users
   - Session token created
   - User redirected to dashboard

3. **Session Management**:
   - JWT-based sessions
   - 30-day expiration
   - Secure cookie storage
   - Auto-refresh capability

---

## 🛍️ Shopping Experience

### Product Discovery
```
/shop → Search Products → Filter → Sort → Add to Cart
```

### Checkout Flow
```
Add to Cart → Review Cart → Update Quantity → Checkout → Order Confirmation
```

### Order Tracking
```
Dashboard → Orders Section → View Details
```

---

## 🎨 UI Components Available

### ProductSearch Component
```tsx
<ProductSearch onSearch={handleSearch} />
```
- Real-time search input
- Category dropdown
- Sort options
- Clear filters button

### Notification System
```tsx
const { addNotification } = useNotification();
addNotification('Success!', 'success', 3000);
```

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
