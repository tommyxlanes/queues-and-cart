"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/cart/cart.store";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const clear = useCartStore((s) => s.clear);
  const params = useSearchParams();
  const orderId = params.get("orderId");

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <div className="max-w-xl mx-auto p-6 text-center space-y-4">
      <h1 className="text-2xl font-bold">Order complete 🎉</h1>

      <p className="text-gray-600">
        Thank you for your purchase. Your order has been successfully placed.
      </p>

      {orderId && (
        <p className="text-sm text-gray-500">
          Order ID: <span className="font-mono">{orderId}</span>
        </p>
      )}
    </div>
  );
}
