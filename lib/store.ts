import { create } from 'zustand';
import { CartItem, User } from '@/types';

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
