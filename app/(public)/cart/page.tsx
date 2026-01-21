"use client";

import { useCartStore } from "@/lib/cart/cart.store";
import Image from "next/image";

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold">Your cart is empty</h1>
          <p className="text-neutral-500">
            Looks like you haven’t added anything yet.
          </p>
        </div>
      </div>
    );
  }

  const subtotalCents = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  async function checkout() {
    const res = await fetch("/api/checkout/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    const data = await res.json();
    if (data.url) window.location.href = data.url;
  }

  return (
    <div className="min-h-screen bg-neutral-50 px-6 py-16">
      <div className="max-w-4xl mx-auto grid gap-10 md:grid-cols-3">
        {/* Cart items */}
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>

          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex gap-4 rounded-xl bg-white p-4 shadow-sm border"
              >
                {/* Image placeholder */}
                <Image
                  src={item.imageUrl}
                  width="80"
                  height="80"
                  alt="Men lucky cat tee"
                />
                {/* <div className="h-20 w-20 rounded-lg bg-neutral-100 flex-shrink-0">

                </div> */}

                {/* Info */}
                <div className="flex-1 space-y-1">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-neutral-500">
                    ${(item.price / 100).toFixed(2)}
                  </div>

                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-sm text-red-500 hover:underline mt-2"
                  >
                    Remove
                  </button>
                </div>

                {/* Quantity */}
                <div className="flex items-center">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.productId, Number(e.target.value))
                    }
                    className="w-16 rounded-md border px-2 py-1 text-center"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="h-fit rounded-xl bg-white p-6 shadow-sm border space-y-6">
          <h2 className="text-lg font-semibold">Order Summary</h2>

          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">Subtotal</span>
            <span className="font-medium">
              ${(subtotalCents / 100).toFixed(2)}
            </span>
          </div>

          <div className="border-t pt-4 flex justify-between font-semibold">
            <span>Total</span>
            <span>${(subtotalCents / 100).toFixed(2)}</span>
          </div>

          <button
            onClick={checkout}
            className="w-full rounded-lg bg-black text-white py-3 font-medium hover:bg-neutral-800 transition"
          >
            Checkout
          </button>

          <p className="text-xs text-neutral-500 text-center">
            Taxes and shipping calculated at checkout
          </p>
        </div>
      </div>
    </div>
  );
}
