"use server";

import { z } from "zod";
import { subscribeToNewsletterService } from "@/services/newsletter";

const newsletterSchema = z.object({
  email: z.email(),
});

export type NewsletterActionState =
  | { status: "success" }
  | { status: "error"; message: string };

export async function subscribeToNewsletter(
  _: NewsletterActionState | null,
  formData: FormData,
): Promise<NewsletterActionState> {
  const parsed = newsletterSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please enter a valid email address.",
    };
  }

  await subscribeToNewsletterService(parsed.data.email);

  return { status: "success" };
}
