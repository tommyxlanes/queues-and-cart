import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { AddToCartButton } from "@/components/AddToCartButton";
import Image from "next/image";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    select: {
      id: true,
      title: true,
      price: true,
      imageUrl: true,
    },
  });

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded space-y-2">
            <Image
              src={product.imageUrl}
              height={80}
              width={80}
              alt={product.title}
            />
            <Link href={`/products/${product.id}`}>
              <h2 className="font-medium hover:underline">{product.title}</h2>
            </Link>

            <div className="text-sm">${(product.price / 100).toFixed(2)}</div>

            <AddToCartButton
              product={{
                id: product.id,
                title: product.title,
                price: product.price,
                imageUrl: product.imageUrl,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
