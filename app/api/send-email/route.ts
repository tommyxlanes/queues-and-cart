import { emailQueue } from "@/lib/queues/emailQueue";

type SendEmailBody = {
  email: string;
  name: string;
};

export async function POST(req: Request) {
  const body = (await req.json()) as SendEmailBody;

  const { email, name } = body;

  // Basic validation (important)
  if (!email || !name) {
    return new Response(
      JSON.stringify({ error: "email and name are required" }),
      { status: 400 },
    );
  }

  await emailQueue.add(
    "send-welcome-email",
    {
      to: email,
      name,
    },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 2000,
      },
    },
  );

  return Response.json({ status: "queued" });
}
