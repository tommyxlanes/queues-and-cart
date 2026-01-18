export async function track(event: string, data: Record<string, any>) {
  if (process.env.NODE_ENV === "development") return;

  console.log("Analytics:", event, data);

  // later:
  // PostHog / Segment / GA / internal
}
