# Ulagan API Documentation

Complete API reference for the Ulagan e-commerce platform.

## Authentication

All protected endpoints require an active session from NextAuth.js.

### Session Header
```
Authorization: Bearer <session-token>
```

Or via NextAuth session cookie (automatic in browser).

---

## Products API

### Search Products
```
GET /api/products/search
```

**Query Parameters**:
- `search` (optional): Search term for product name/description
- `category` (optional): Filter by category
- `sort` (optional): Sort by `name`, `price-low`, `price-high`, or `rating`

**Example**:
```bash
GET /api/products/search?search=laptop&category=electronics&sort=price-low
```

**Response**:
```javascript
{
  success: true,
  products: [
    {
      id: string,
      name: string,
      description: string,
      price: number,
      category: string,
      rating: number,
      image: string
    }
  ],
  count: number
}
```

**Status Codes**: 
- 200: Success
- 400: Invalid parameters

---

## Orders API

### Create Order
```
POST /api/orders
```

**Headers**:
```
Content-Type: application/json
```

**Body**:
```javascript
{
  items: [
    {
      id: string,
      name: string,
      price: number,
      quantity: number
    }
  ],
  subtotal: number,
  tax: number,
  total: number
}
```

**Response**:
```javascript
{
  success: true,
  order: {
    id: string,
    userId: string,
    items: array,
    subtotal: number,
    tax: number,
    total: number,
    status: 'pending',
    createdAt: Date
  }
}
```

**Status Codes**:
- 201: Order created
- 401: Unauthorized
- 400: Invalid data

### Get User Orders
```
GET /api/orders
```

**Response**:
```javascript
{
  success: true,
  orders: [
    {
      id: string,
      userId: string,
      items: array,
      total: number,
      status: string,
      createdAt: Date
    }
  ],
  count: number
}
```

**Status Codes**:
- 200: Success
- 401: Unauthorized

---

## Wishlist API

### Add to Wishlist
```
POST /api/wishlist
```

**Body**:
```javascript
{
  productId: string,
  productName: string,
  productPrice: number,
  productImage: string
}
```

**Response**:
```javascript
{
  success: true,
  message: 'Added to wishlist',
  wishlistItem: {
    id: string,
    productId: string,
    productName: string,
    productPrice: number,
    productImage: string,
    addedAt: Date
  }
}
```

### Get Wishlist
```
GET /api/wishlist
```

**Response**:
```javascript
{
  success: true,
  wishlist: [
    {
      id: string,
      productId: string,
      productName: string,
      productPrice: number,
      productImage: string
    }
  ],
  count: number
}
```

### Remove from Wishlist
```
DELETE /api/wishlist
```

**Body**:
```javascript
{
  productId: string
}
```

**Response**:
```javascript
{
  success: true,
  message: 'Removed from wishlist'
}
```

**Status Codes**:
- 200: Success
- 401: Unauthorized
- 404: Item not found

---

## Reviews API

### Submit Review
```
POST /api/reviews
```

**Body**:
```javascript
{
  productId: string,
  rating: number,      // 1-5
  title: string,
  comment: string
}
```

**Response**:
```javascript
{
  success: true,
  message: 'Review posted',
  review: {
    id: string,
    productId: string,
    userId: string,
    rating: number,
    title: string,
    comment: string,
    createdAt: Date
  }
}
```

### Get Product Reviews
```
GET /api/reviews?productId=<id>
```

**Response**:
```javascript
{
  success: true,
  reviews: [
    {
      id: string,
      productId: string,
      userId: string,
      rating: number,
      title: string,
      comment: string,
      createdAt: Date
    }
  ],
  averageRating: number,
  totalReviews: number
}
```

**Status Codes**:
- 200: Success
- 400: Missing productId
- 401: Unauthorized (for POST)

---

## Coupons API

### Validate Coupon
```
POST /api/coupons
```

**Body**:
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

### Get Active Coupons
```
GET /api/coupons
```

**Response**:
```javascript
{
  success: true,
  coupons: [
    {
      id: string,
      code: string,
      discountType: string,
      discountValue: number,
      maxUses: number,
      currentUses: number,
      expiresAt: Date,
      minOrderValue: number
    }
  ],
  count: number
}
```

**Demo Coupons**:
- WELCOME10: 10% off
- SAVE20: 20% off (min $100)
- FLAT50: $50 off (min $200)

**Status Codes**:
- 200: Success
- 400: Invalid/expired coupon
- 404: Coupon not found

---

## Loyalty API

### Add Points / Update Loyalty
```
POST /api/loyalty
```

**Body**:
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
    level: 'bronze' | 'silver' | 'gold' | 'platinum',
    totalSpent: number,
    levelBenefits: {
      discount: string,
      freeShipping: boolean,
      priority: boolean
    }
  }
}
```

### Get Loyalty Status
```
GET /api/loyalty
```

**Response**:
```javascript
{
  success: true,
  loyalty: {
    points: number,
    level: string,
    totalSpent: number,
    levelBenefits: object,
    nextLevelAt: {
      level: string,
      amount: number
    }
  }
}
```

**Status Codes**:
- 200: Success
- 401: Unauthorized

---

## Messages API

### Send Message
```
POST /api/messages
```

**Body**:
```javascript
{
  toUserId: string,
  content: string
}
```

**Response**:
```javascript
{
  success: true,
  message: 'Message sent',
  data: {
    id: string,
    fromUserId: string,
    toUserId: string,
    content: string,
    read: false,
    createdAt: Date
  }
}
```

### Get Messages
```
GET /api/messages?type=received&with=<userId>
```

**Query Parameters**:
- `type`: `received`, `sent`, or `conversation`
- `with` (optional): User ID for conversation type

**Response**:
```javascript
{
  success: true,
  messages: array,
  unreadCount: number,
  count: number
}
```

### Mark as Read
```
PATCH /api/messages
```

**Body**:
```javascript
{
  messageId: string
}
```

**Response**:
```javascript
{
  success: true,
  message: 'Message marked as read'
}
```

**Status Codes**:
- 200: Success
- 401: Unauthorized
- 404: Message not found

---

## Referral API

### Generate Referral Code
```
POST /api/referral
```

**Body**:
```javascript
{
  action: 'generate'
}
```

**Response**:
```javascript
{
  success: true,
  referralCode: string,
  bonus: 500,
  message: 'Share this code to earn rewards!'
}
```

### Redeem Referral Code
```
POST /api/referral
```

**Body**:
```javascript
{
  action: 'redeem',
  referralCode: string,
  referredUserId: string
}
```

**Response**:
```javascript
{
  success: true,
  message: 'Referral code redeemed successfully!',
  bonus: 500,
  referrerName: string
}
```

### Get Referral Status
```
GET /api/referral
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

**Status Codes**:
- 200: Success
- 400: Invalid action/code
- 401: Unauthorized

---

## Blog Comments API

### Post Comment
```
POST /api/blog-comments
```

**Body**:
```javascript
{
  postId: string,
  content: string
}
```

**Response**:
```javascript
{
  success: true,
  message: 'Comment posted successfully',
  comment: {
    id: string,
    postId: string,
    userId: string,
    userName: string,
    content: string,
    likes: 0,
    createdAt: Date
  }
}
```

### Get Comments
```
GET /api/blog-comments?postId=<id>
```

**Response**:
```javascript
{
  success: true,
  comments: array,
  count: number
}
```

### Like Comment
```
PATCH /api/blog-comments
```

**Body**:
```javascript
{
  commentId: string,
  action: 'like'
}
```

### Delete Comment
```
DELETE /api/blog-comments
```

**Body**:
```javascript
{
  commentId: string
}
```

**Status Codes**:
- 200: Success
- 400: Empty comment
- 401: Unauthorized
- 404: Not found

---

## Email API

### Send Email
```
POST /api/email
```

**Body**:
```javascript
{
  emailType: 'orderConfirmation' | 'orderShipped' | 'orderDelivered' | 'promotionalOffer' | 'accountNotification' | 'abandonedCart',
  data: any
}
```

**Response**:
```javascript
{
  success: true,
  message: 'Email sent successfully',
  email: {
    id: string,
    to: string,
    subject: string,
    body: string,
    type: string,
    sent: true,
    sentAt: Date
  }
}
```

### Get Email Templates
```
GET /api/email
```

**Response**:
```javascript
{
  success: true,
  emailTemplates: array,
  message: 'Get any of these email types by sending POST request'
}
```

---

## Two-Factor Authentication API

### Setup 2FA
```
POST /api/two-factor
```

**Body**:
```javascript
{
  action: 'setup',
  method: 'email' | 'authenticator'
}
```

**Response**:
```javascript
{
  success: true,
  secret: string,
  backupCodes: string[],
  qrCodeUrl: string,
  message: 'Scan QR code with Google Authenticator or Authy'
}
```

### Verify 2FA
```
POST /api/two-factor
```

**Body**:
```javascript
{
  action: 'verify',
  code: string
}
```

### Verify Backup Code
```
POST /api/two-factor
```

**Body**:
```javascript
{
  action: 'verify-backup',
  backupCode: string
}
```

### Get 2FA Status
```
GET /api/two-factor
```

**Response**:
```javascript
{
  success: true,
  enabled: boolean,
  method: string,
  backupCodesRemaining: number
}
```

### Disable 2FA
```
POST /api/two-factor
```

**Body**:
```javascript
{
  action: 'disable'
}
```

**Status Codes**:
- 200: Success
- 400: Invalid code/setup
- 401: Unauthorized

---

## Analytics API

### Get Analytics
```
GET /api/analytics
```

**Response**:
```javascript
{
  success: true,
  analytics: {
    totalUsers: number,
    totalOrders: number,
    totalRevenue: number,
    conversionRate: number
  }
}
```

---

## Error Handling

All errors follow this format:

```javascript
{
  error: string,
  status: number
}
```

### Common HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Server Error |

---

## Rate Limiting

Currently no rate limiting implemented. Add Upstash or similar service for production.

---

## Pagination

Not implemented in current version. Add for production:

```
GET /api/endpoint?page=1&limit=20
```

---

## Authentication Examples

### Using Fetch

```javascript
// Send message
const response = await fetch('/api/messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    toUserId: 'friend@example.com',
    content: 'Hello!'
  })
});

const data = await response.json();
```

### Using React Hook

```javascript
'use client';

import { useSession } from 'next-auth/react';

export default function Component() {
  const { data: session } = useSession();

  if (!session) return <div>Not authenticated</div>;

  return <div>Welcome {session.user.email}</div>;
}
```

---

## Troubleshooting

### 401 Unauthorized
- Check if user is logged in
- Verify session cookie exists
- Clear browser cookies and re-login

### 404 Not Found
- Verify API endpoint is correct
- Check request path spelling
- Ensure resource exists (product ID, etc.)

### 400 Bad Request
- Verify all required fields are provided
- Check data types match schema
- Validate input values (e.g., rating 1-5)

---

## Best Practices

1. **Always validate user input** on the backend
2. **Use session validation** for all protected routes
3. **Return consistent error messages**
4. **Log sensitive operations** for audit trail
5. **Cache frequently accessed data** (products, categories)
6. **Implement rate limiting** in production
7. **Use HTTPS only** in production
8. **Validate all external inputs**

---

Last updated: 2024

For more information, visit the main [FEATURES.md](./FEATURES.md) file.
