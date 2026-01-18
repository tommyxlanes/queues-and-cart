// api/checkout/product
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { z } from "zod";

const CheckoutItemSchema = z.object({
  productId: z.string().cuid(),
  quantity: z.number().int().min(1).max(10),
});

const CheckoutRequestSchema = z.object({
  items: z.array(CheckoutItemSchema).min(1),
});

export async function POST(req: NextRequest) {
  const json = await req.json();

  const parsed = CheckoutRequestSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { items } = parsed.data;

  // 🔒 Fetch canonical products
  const products = await prisma.product.findMany({
    where: {
      id: { in: items.map((i) => i.productId) },
      isActive: true,
    },
  });

  if (products.length !== items.length) {
    return NextResponse.json({ error: "Invalid cart" }, { status: 400 });
  }

  const productMap = new Map(products.map((p) => [p.id, p]));

  // 🔐 Recompute total from DB prices
  const amount = items.reduce((sum, i) => {
    const product = productMap.get(i.productId)!;
    return sum + product.price * i.quantity;
  }, 0);

  const order = await prisma.order.create({
    data: {
      amount,
      status: "PENDING",
      items: {
        create: items.map((i) => {
          const product = productMap.get(i.productId)!;
          return {
            productId: product.id,
            quantity: i.quantity,
            unitPrice: product.price,
          };
        }),
      },
    },
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],

    // ✅ Stripe will collect the email
    customer_creation: "if_required",

    line_items: items.map((i) => {
      const product = productMap.get(i.productId)!;
      return {
        quantity: i.quantity,
        price_data: {
          currency: "usd",
          unit_amount: product.price,
          product_data: { name: product.title },
        },
      };
    }),
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
    metadata: { orderId: order.id },
  });

  return NextResponse.json({ url: session.url });
}
