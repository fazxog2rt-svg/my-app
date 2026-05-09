export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  image?: string;
  category: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  likes: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  createdAt: Date;
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  helpful: number;
  createdAt: Date;
  verified: boolean;
}

export interface Wishlist {
  id: string;
  userId: string;
  productId: string;
  productName: string;
  productPrice: number;
  productImage: string;
  createdAt: Date;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxUses: number;
  currentUses: number;
  expiresAt: Date;
  active: boolean;
  minOrderValue?: number;
}

export interface LoyaltyPoints {
  id: string;
  userId: string;
  points: number;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  totalSpent: number;
  createdAt: Date;
  lastUpdated: Date;
}

export interface Message {
  id: string;
  fromUserId: string;
  toUserId: string;
  content: string;
  read: boolean;
  createdAt: Date;
}

export interface Referral {
  id: string;
  referrerId: string;
  referredUserId: string;
  referralCode: string;
  bonus: number;
  redeemed: boolean;
  createdAt: Date;
}

export interface UserRating {
  id: string;
  ratedUserId: string;
  ratedByUserId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface BlogComment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  content: string;
  likes: number;
  createdAt: Date;
  verified: boolean;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  details: string;
  ipAddress: string;
  createdAt: Date;
}

export interface TwoFactorAuth {
  userId: string;
  enabled: boolean;
  secret?: string;
  backupCodes: string[];
  method: 'email' | 'authenticator';
}
