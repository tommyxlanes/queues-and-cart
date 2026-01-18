import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { sendOrderEmail } from "@/lib/email/sendOrderEmail";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // ✅ ONLY handle the event you care about
  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const orderId = session.metadata?.orderId;

  if (!orderId) {
    return NextResponse.json({ received: true });
  }

  const email = session.customer_details?.email || session.customer_email;

  // 🔒 Fetch order first (idempotency guard)
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    // Order doesn’t exist → ignore safely
    return NextResponse.json({ received: true });
  }

  if (order.status === "COMPLETED") {
    // Already processed → avoid double email
    return NextResponse.json({ received: true });
  }

  // ✅ Mark order completed ONCE
  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: "COMPLETED",
      email: email ?? undefined,
    },
  });

  // 🧵 Async side-effect (email)
  try {
    await sendOrderEmail(orderId);
  } catch (err) {
    console.error("Email failed", err);
    // Do NOT throw — order is already correct
  }

  return NextResponse.json({ received: true });
}
