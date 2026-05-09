import { create } from 'zustand';
import { CartItem, User, Wishlist, LoyaltyPoints, Message } from '@/types';

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

interface CartStore {
  items: CartItem[];
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  calculateTotal: (items: CartItem[]) => void;
}

interface NotificationStore {
  notifications: any[];
  addNotification: (notif: any) => void;
  removeNotification: (id: string) => void;
}

interface WishlistStore {
  items: Wishlist[];
  addItem: (item: Wishlist) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

interface LoyaltyStore {
  points: number;
  level: string;
  totalSpent: number;
  addPoints: (points: number) => void;
  redeemPoints: (points: number) => void;
  updateLevel: () => void;
}

interface MessageStore {
  messages: Message[];
  unreadCount: number;
  addMessage: (message: Message) => void;
  markAsRead: (messageId: string) => void;
  getConversation: (userId: string) => Message[];
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ isLoading: loading }),
  logout: () => set({ user: null }),
}));

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  total: 0,
  addItem: (item) => {
    const current = get().items;
    const existing = current.find(i => i.productId === item.productId);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      current.push(item);
    }
    set({ items: [...current] });
    get().calculateTotal(get().items);
  },
  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter(i => i.productId !== productId),
    }));
    get().calculateTotal(get().items);
  },
  updateQuantity: (productId, quantity) => {
    const items = get().items;
    const item = items.find(i => i.productId === productId);
    if (item) {
      item.quantity = quantity;
    }
    set({ items: [...items] });
    get().calculateTotal(items);
  },
  clearCart: () => set({ items: [], total: 0 }),
  calculateTotal: (items) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    set({ total });
  },
}));

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (notif) => set((state) => ({
    notifications: [...state.notifications, notif],
  })),
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id),
  })),
}));

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],
  addItem: (item) => {
    const exists = get().items.find(w => w.productId === item.productId);
    if (!exists) {
      set((state) => ({
        items: [...state.items, item],
      }));
    }
  },
  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter(w => w.productId !== productId),
    }));
  },
  isInWishlist: (productId) => {
    return get().items.some(w => w.productId === productId);
  },
  clearWishlist: () => set({ items: [] }),
}));

export const useLoyaltyStore = create<LoyaltyStore>((set, get) => ({
  points: 0,
  level: 'bronze',
  totalSpent: 0,
  addPoints: (points) => {
    set((state) => ({
      points: state.points + points,
    }));
    get().updateLevel();
  },
  redeemPoints: (points) => {
    set((state) => ({
      points: Math.max(0, state.points - points),
    }));
    get().updateLevel();
  },
  updateLevel: () => {
    const { points } = get();
    let level = 'bronze';
    if (points >= 5000) level = 'platinum';
    else if (points >= 3000) level = 'gold';
    else if (points >= 1000) level = 'silver';
    set({ level });
  },
}));

export const useMessageStore = create<MessageStore>((set, get) => ({
  messages: [],
  unreadCount: 0,
  addMessage: (message) => {
    set((state) => ({
      messages: [...state.messages, message],
      unreadCount: state.unreadCount + (message.read ? 0 : 1),
    }));
  },
  markAsRead: (messageId) => {
    const message = get().messages.find(m => m.id === messageId);
    if (message && !message.read) {
      message.read = true;
      set((state) => ({
        unreadCount: Math.max(0, state.unreadCount - 1),
        messages: [...get().messages],
      }));
    }
  },
  getConversation: (userId) => {
    return get().messages.filter(m => m.fromUserId === userId || m.toUserId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
}));
