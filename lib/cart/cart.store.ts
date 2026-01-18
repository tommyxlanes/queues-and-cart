"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: string;
  title: string;
  price: number; // cents
  quantity: number;
};

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  totalAmount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const existing = get().items.find(
          (i) => i.productId === item.productId,
        );

        if (existing) {
          set({
            items: get().items.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i,
            ),
          });
        } else {
          set({ items: [...get().items, item] });
        }
      },

      updateQuantity: (productId, quantity) =>
        set({
          items:
            quantity <= 0
              ? get().items.filter((i) => i.productId !== productId)
              : get().items.map((i) =>
                  i.productId === productId ? { ...i, quantity } : i,
                ),
        }),

      removeItem: (productId) =>
        set({
          items: get().items.filter((i) => i.productId !== productId),
        }),

      clear: () => set({ items: [] }),

      totalAmount: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: "store-cart" },
  ),
);

export const useCartCount = () =>
  useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));

export const useCartTotal = () =>
  useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  );
