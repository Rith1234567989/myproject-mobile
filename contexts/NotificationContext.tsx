import React, { createContext, useContext, useState } from "react";

export interface AppNotification {
  id: string;
  category: "message" | "price_drop" | "ad_status" | "promo" | "security";
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  itemImage?: string;
  actionText?: string;
  actionRoute?: string;
}

export interface NotificationPreferences {
  pushEnabled: boolean;
  priceDropAlerts: boolean;
  chatMessages: boolean;
  adStatusUpdates: boolean;
  promotionsAndDeals: boolean;
  soundEnabled: boolean;
  vibrateEnabled: boolean;
}

const DEFAULT_PREFERENCES: NotificationPreferences = {
  pushEnabled: true,
  priceDropAlerts: true,
  chatMessages: true,
  adStatusUpdates: true,
  promotionsAndDeals: true,
  soundEnabled: true,
  vibrateEnabled: true,
};

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: "notif-1",
    category: "price_drop",
    title: "Price Drop Alert! 📉",
    description:
      "An item on your Saved list 'iPhone 15 Pro Max 256GB' dropped in price from $1,250 to $1,150!",
    timestamp: "10 mins ago",
    isRead: false,
    itemImage:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600",
    actionText: "View Deal",
    actionRoute: "/(categories)/product/p1",
  },
  {
    id: "notif-2",
    category: "message",
    title: "New Message from Sokha Electronics",
    description:
      "\"Yes, it is still available! You can come test it at Toul Kork anytime today.\"",
    timestamp: "45 mins ago",
    isRead: false,
    itemImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    actionText: "Reply Now",
    actionRoute: "/(tabs)/chat",
  },
  {
    id: "notif-3",
    category: "ad_status",
    title: "Ad Published Successfully! 🎉",
    description:
      "Your listing 'Sony WH-1000XM5 Wireless Headphones' is now LIVE on the marketplace.",
    timestamp: "2 hours ago",
    isRead: true,
    itemImage:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    actionText: "View My Ad",
    actionRoute: "/(categories)/product/p6",
  },
  {
    id: "notif-4",
    category: "promo",
    title: "Featured Seller Promotion ⚡",
    description:
      "Boost your listings today with 50% OFF Super Ad Bump packages for Phnom Penh area!",
    timestamp: "Yesterday",
    isRead: true,
    actionText: "Claim Discount",
    actionRoute: "/(tabs)/sell",
  },
  {
    id: "notif-5",
    category: "security",
    title: "Security & Login Notice",
    description:
      "Your account logged in from a new device (iPhone 15 Pro, Phnom Penh, KH).",
    timestamp: "2 days ago",
    isRead: true,
    actionText: "Check Settings",
    actionRoute: "/(auth)/settings",
  },
];

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markMultipleAsRead: (ids: string[]) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  deleteMultiple: (ids: string[]) => void;
  clearAll: () => void;
  preferences: NotificationPreferences;
  updatePreferences: (updates: Partial<NotificationPreferences>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] =
    useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [preferences, setPreferences] =
    useState<NotificationPreferences>(DEFAULT_PREFERENCES);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markMultipleAsRead = (ids: string[]) => {
    const idSet = new Set(ids);
    setNotifications((prev) =>
      prev.map((n) => (idSet.has(n.id) ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const deleteMultiple = (ids: string[]) => {
    const idSet = new Set(ids);
    setNotifications((prev) => prev.filter((n) => !idSet.has(n.id)));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const updatePreferences = (updates: Partial<NotificationPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...updates }));
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markMultipleAsRead,
        markAllAsRead,
        deleteNotification,
        deleteMultiple,
        clearAll,
        preferences,
        updatePreferences,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
