"use client";

import { useCartStore } from "@/lib/cart/cart.store";

type AddToCartProduct = {
  id: string;
  title: string;
  price: number; // cents
  imageUrl: string | null;
};

type AddToCartButtonProps = {
  product: AddToCartProduct;
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <button
      className="bg-black text-white px-4 py-2 hover:bg-black/90 transition cursor-pointer"
      onClick={() =>
        addItem({
          productId: product.id,
          title: product.title,
          price: product.price,
          quantity: 1,
          imageUrl: product.imageUrl,
        })
      }
    >
      Add to cart
    </button>
  );
}
