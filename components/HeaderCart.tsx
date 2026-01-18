"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartCount } from "@/lib/cart/cart.store";
import { motion, AnimatePresence } from "framer-motion";

export function HeaderCart() {
  const count = useCartCount();

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center gap-2"
      aria-label="Cart"
    >
      <ShoppingCart className="w-5 h-5 text-[#222222]" />

      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key="cart-badge"
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.9 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="
              absolute -top-2 -right-2
              min-w-[18px] h-[18px]
              rounded-full
              bg-[#1739fa]
              text-white
              text-xs
              font-bold
              flex items-center justify-center
              leading-none
            "
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}
