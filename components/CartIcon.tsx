"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartCount } from "@/lib/cart/cart.store";

export function CartIcon() {
  const count = useCartCount();

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="w-6 h-6" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
          {count}
        </span>
      )}
    </Link>
  );
}
