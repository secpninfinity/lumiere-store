'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const KEY = 'meowhouse_cart';
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // โหลดตะกร้าจาก localStorage ครั้งเดียวตอน mount (กัน hydration mismatch)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  const persist = (next) => {
    setItems(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };

  // แมวมีตัวเดียว — กันเพิ่มซ้ำ คืน false ถ้าอยู่ในตะกร้าแล้ว
  const addItem = (cat) => {
    if (items.some((i) => i.name === cat.name)) return false;
    persist([...items, { name: cat.name, type: cat.type, price: cat.price, photo: cat.photo }]);
    return true;
  };

  const removeItem = (name) => persist(items.filter((i) => i.name !== name));
  const clear = () => persist([]);

  const value = {
    items,
    isOpen,
    addItem,
    removeItem,
    clear,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
