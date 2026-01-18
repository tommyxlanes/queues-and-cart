import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const CartProductsSchema = z.object({
  productIds: z.array(z.string().cuid()).min(1),
});

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = CartProductsSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ products: [] });
  }

  const { productIds } = parsed.data;

  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds },
      isActive: true,
    },
    select: {
      id: true,
      title: true,
      price: true,
    },
  });

  return NextResponse.json({
    products: products.map((p) => ({
      ...p,
      price: p.price.toString(),
    })),
  });
}
