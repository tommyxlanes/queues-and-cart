import "dotenv/config";
import { Worker } from "bullmq";
import { redisConnection } from "@/lib/redis";
import { resend } from "@/lib/resend";

import { WelcomeEmail } from "@/components/emails/WelcomeEmail";
import { ConfirmNewsletterEmail } from "@/components/emails/ConfirmNewsletterEmail";

const worker = new Worker(
  "emails",
  async (job) => {
    switch (job.name) {
      case "send-welcome-email": {
        const { to, name } = job.data;

        console.log("📨 Sending welcome email to", to);

        const result = await resend.emails.send({
          from: process.env.EMAIL_FROM!,
          to,
          subject: "Welcome!",
          react: WelcomeEmail({ name }),
        });

        if (result.error) {
          throw new Error(result.error.message);
        }

        console.log("✅ Welcome email sent:", result.data?.id);
        break;
      }

      case "newsletter-confirmation": {
        const { to, token } = job.data;

        console.log("📨 Sending confirmation email to", to);

        const result = await resend.emails.send({
          from: process.env.EMAIL_FROM!,
          to,
          subject: "Confirm your subscription",
          react: ConfirmNewsletterEmail({ token }),
        });

        if (result.error) {
          throw new Error(result.error.message);
        }

        console.log("✅ Confirmation email sent:", result.data?.id);
        break;
      }

      default:
        throw new Error(`Unhandled email job type: ${job.name}`);
    }
  },
  {
    connection: redisConnection,
    concurrency: 3,
  },
);

worker.on("ready", () => {
  console.log("📨 Email worker ready");
});

worker.on("completed", (job) => {
  console.log(`✅ Job completed: ${job.name}`);
});

worker.on("failed", (job, err) => {
  console.error(`❌ Job failed: ${job?.name}`, err.message);
});
