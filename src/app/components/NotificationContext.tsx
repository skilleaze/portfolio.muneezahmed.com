import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: 'welcome' | 'download' | 'linkedin' | 'general';
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'time' | 'unread'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Load notifications from localStorage
    const stored = localStorage.getItem('notifications');
    if (stored) {
      setNotifications(JSON.parse(stored));
    }

    // Check if this is a first-time visitor
    const hasVisitedBefore = localStorage.getItem('hasVisited');
    if (!hasVisitedBefore) {
      // Add welcome notification
      const welcomeNotification: Notification = {
        id: Date.now().toString(),
        title: 'Welcome! 👋',
        message: 'Thank you for visiting my portfolio. Explore my work, skills, and experience!',
        time: 'Just now',
        unread: true,
        type: 'welcome',
      };
      setNotifications([welcomeNotification]);
      localStorage.setItem('hasVisited', 'true');
      localStorage.setItem('notifications', JSON.stringify([welcomeNotification]));
    }
  }, []);

  const addNotification = (notification: Omit<Notification, 'id' | 'time' | 'unread'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      time: 'Just now',
      unread: true,
    };

    setNotifications((prev) => {
      const updated = [newNotification, ...prev];
      localStorage.setItem('notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) => {
      const updated = prev.map((notif) =>
        notif.id === id ? { ...notif, unread: false } : notif
      );
      localStorage.setItem('notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const markAllAsRead = () => {
    setNotifications((prev) => {
      const updated = prev.map((notif) => ({ ...notif, unread: false }));
      localStorage.setItem('notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const clearAll = () => {
    setNotifications([]);
    localStorage.setItem('notifications', JSON.stringify([]));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, markAsRead, markAllAsRead, clearAll }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
