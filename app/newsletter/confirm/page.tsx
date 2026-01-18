import { confirmNewsletterService } from "@/services/newsletter";

type Props = {
  searchParams: Promise<{ token?: string }>;
};

export default async function ConfirmPage({ searchParams }: Props) {
  const { token } = await searchParams;

  if (!token) {
    return <p>Invalid confirmation link.</p>;
  }

  try {
    await confirmNewsletterService(token);
    return <p>✅ Subscription confirmed!</p>;
  } catch (err) {
    console.error("Confirmation failed:", err);
    return <p>❌ This confirmation link is invalid or expired.</p>;
  }
}
