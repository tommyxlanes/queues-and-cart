import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { AddToCartButton } from "@/components/AddToCartButton";

type Props = {
  params: { id: string };
};

export default async function ProductDetailPage({ params }: Props) {
  const product = await prisma.product.findFirst({
    where: {
      id: params.id,
      isActive: true,
    },
    select: {
      id: true,
      title: true,
      price: true,
      inventory: true,
      imageUrl: true,
    },
  });

  if (!product) return notFound();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 grid gap-12 md:grid-cols-2">
      {/* Image */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-100">
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        )}
      </div>

      {/* Info */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{product.title}</h1>

        <div className="text-xl text-neutral-700">
          ${(product.price / 100).toFixed(2)}
        </div>

        <div className="text-sm text-neutral-500">
          {product.inventory > 0
            ? `${product.inventory} in stock`
            : "Out of stock"}
        </div>

        {product.inventory > 0 ? (
          <AddToCartButton
            product={{
              id: product.id,
              title: product.title,
              price: product.price,
              imageUrl: product.imageUrl,
            }}
          />
        ) : (
          <button
            disabled
            className="px-6 py-3 rounded-md bg-neutral-300 text-neutral-600 cursor-not-allowed"
          >
            Out of stock
          </button>
        )}

        <div className="pt-6 text-sm text-neutral-600 leading-relaxed">
          <p>
            Designed with quality materials and attention to detail. Built to
            last and made for everyday use.
          </p>
        </div>
      </div>
    </div>
  );
}
