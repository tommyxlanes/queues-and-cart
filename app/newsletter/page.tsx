import { NewsletterForm } from "@/components/NewsletterForm";

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Join our newsletter</h1>

      <NewsletterForm />
    </main>
  );
}
