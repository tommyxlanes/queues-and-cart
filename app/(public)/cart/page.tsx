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
                  src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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

// "use client";

// import { useCartStore } from "@/lib/cart/cart.store";
// import { Loader2 } from "lucide-react";
// import { useEffect, useState } from "react";

// type CartProduct = {
//   id: string;
//   title: string;
//   price: string; // cents as string from API
//   imageUrl?: string | null;
// };

// type MergedCartItem = CartProduct & {
//   quantity: number;
// };

// export default function CartPage() {
//   const { items, updateQuantity, removeItem } = useCartStore();
//   const [products, setProducts] = useState<CartProduct[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Load canonical product data for items in cart
//   useEffect(() => {
//     let cancelled = false;

//     async function load() {
//       if (items.length === 0) {
//         setProducts([]);
//         setLoading(false);
//         return;
//       }

//       setLoading(true);

//       const res = await fetch("/api/cart/products", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           productIds: items.map((i) => i.productId),
//         }),
//       });

//       const data = await res.json();

//       if (!cancelled) {
//         setProducts(data.products ?? []);
//         setLoading(false);
//       }
//     }

//     load();

//     return () => {
//       cancelled = true;
//     };
//   }, [items]);

//   if (loading)
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="flex items-center gap-2">
//           <Loader2 className="animate-spin" /> Loading cart…
//         </p>
//       </div>
//     );
//   if (items.length === 0)
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p>Your cart is empty</p>
//       </div>
//     );

//   // 🔒 Cart items are source of truth; products are supplemental
//   const merged: MergedCartItem[] = items
//     .map((item) => {
//       const product = products.find((p) => p.id === item.productId);
//       if (!product) return null;
//       return {
//         ...product,
//         quantity: item.quantity,
//       };
//     })
//     .filter(Boolean) as MergedCartItem[];

//   // Subtotal in cents
//   const subtotalCents = merged.reduce(
//     (sum, p) => sum + Number(p.price) * p.quantity,
//     0,
//   );

//   async function checkout() {
//     const res = await fetch("/api/checkout/product", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ items }),
//     });

//     const data = await res.json();
//     if (data.url) window.location.href = data.url;
//   }

//   return (
//     <div className="max-w-3xl mx-auto min-h-screen p-6 space-y-6">
//       <h1 className="text-2xl font-bold">Your Cart</h1>

//       {merged.map((p) => (
//         <div key={p.id} className="flex items-center gap-4 border p-4">
//           <div className="flex-1">
//             <div className="font-medium">{p.title}</div>
//             <div>${(Number(p.price) / 100).toFixed(2)}</div>
//           </div>

//           <input
//             type="number"
//             min={1}
//             value={p.quantity}
//             onChange={(e) => updateQuantity(p.id, Number(e.target.value))}
//             className="w-16 border px-2"
//           />

//           <button
//             onClick={() => removeItem(p.id)}
//             className="text-red-500 cursor-pointer transition hover:text-red-400"
//           >
//             Remove
//           </button>
//         </div>
//       ))}

//       <div className="flex justify-between font-semibold">
//         <span>Subtotal</span>
//         <span>${(subtotalCents / 100).toFixed(2)}</span>
//       </div>

//       <button
//         onClick={checkout}
//         className="cursor-pointer transition hover:bg-blue-500 w-full bg-blue-400 text-white py-3"
//       >
//         Checkout
//       </button>
//     </div>
//   );
// }
