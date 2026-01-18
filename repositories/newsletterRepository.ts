import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function createPendingSubscriber(email: string) {
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

  return prisma.newsletterSubscriber.upsert({
    where: { email },
    update: {
      confirmationToken: token,
      tokenExpiresAt: expiresAt,
      status: "PENDING",
    },
    create: {
      email,
      confirmationToken: token,
      tokenExpiresAt: expiresAt,
      status: "PENDING",
    },
  });
}

export async function confirmSubscriber(token: string) {
  const subscriber = await prisma.newsletterSubscriber.findUnique({
    where: { confirmationToken: token },
  });

  if (!subscriber) {
    throw new Error("Invalid token");
  }

  if (!subscriber.tokenExpiresAt || subscriber.tokenExpiresAt < new Date()) {
    throw new Error("Token expired");
  }

  return prisma.newsletterSubscriber.update({
    where: { id: subscriber.id },
    data: {
      status: "CONFIRMED",
      confirmationToken: null,
      tokenExpiresAt: null,
    },
  });
}
