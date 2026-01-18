import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { orderConfirmationTemplate } from "./templates/orderConfirmation";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendOrderEmail(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  if (!order || !order.email) {
    throw new Error("Order or email not found");
  }

  const html = orderConfirmationTemplate({
    orderId: order.id,
    total: order.amount,
    items: order.items.map((i) => ({
      title: i.product.title,
      quantity: i.quantity,
      unitPrice: i.unitPrice,
    })),
  });

  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: [order.email], // ✅ real customer email
    subject: "Your order is confirmed 🎉",
    html,
  });
}
