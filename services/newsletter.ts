import {
  createPendingSubscriber,
  confirmSubscriber,
} from "@/repositories/newsletterRepository";
import { emailQueue } from "@/lib/queues/emailQueue";

export async function subscribeToNewsletterService(email: string) {
  const subscriber = await createPendingSubscriber(email);

  await emailQueue.add(
    "newsletter-confirmation",
    {
      to: email,
      token: subscriber.confirmationToken,
    },
    {
      jobId: `confirm_${subscriber.confirmationToken}`, // ✅ Has to be different to enqueue
      attempts: 3,
    },
  );

  return subscriber;
}

export async function confirmNewsletterService(token: string) {
  const confirmed = await confirmSubscriber(token);

  // ✅ Welcome email happens AFTER confirmation
  await emailQueue.add(
    "send-welcome-email",
    {
      to: confirmed.email,
      name: "there",
    },
    {
      jobId: `welcome_${confirmed.email}`,
    },
  );

  return confirmed;
}
