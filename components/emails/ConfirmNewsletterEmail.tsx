import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Link,
  Hr,
  Section,
} from "@react-email/components";

export function ConfirmNewsletterEmail({ token }: { token: string }) {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/newsletter/confirm?token=${token}`;

  return (
    <Html>
      <Head />
      <Body
        style={{
          backgroundColor: "#020603",
          margin: 0,
          padding: "24px 0",
          fontFamily: "Inter, monospace",
        }}
      >
        <Container
          style={{
            maxWidth: "520px",
            backgroundColor: "#050c08",
            border: "1px solid rgba(120,255,124,.25)",
            boxShadow: "0 0 30px rgba(120,255,124,.08)",
          }}
        >
          <Section style={{ padding: "32px" }}>
            <Heading
              style={{
                color: "#78ff7c",
                fontSize: "22px",
                marginBottom: "16px",
                textShadow: "0 0 8px rgba(120,255,124,.45)",
              }}
            >
              Confirm Your Subscription
            </Heading>

            <Text
              style={{
                color: "#eafbe0",
                fontSize: "14px",
                lineHeight: "20px",
              }}
            >
              You’re almost in.
            </Text>

            <Text
              style={{
                color: "#eafbe0",
                fontSize: "14px",
                lineHeight: "20px",
              }}
            >
              Please confirm your email address to start receiving exclusive
              drops, updates, and early access notifications.
            </Text>

            <Hr
              style={{
                borderColor: "rgba(120,255,124,.25)",
                margin: "24px 0",
              }}
            />

            <Link
              href={url}
              style={{
                display: "inline-block",
                backgroundColor: "rgba(120,255,124,.15)",
                border: "1px solid rgba(120,255,124,.45)",
                color: "#78ff7c",
                padding: "12px 20px",
                textDecoration: "none",
                fontWeight: "bold",
                textShadow: "0 0 6px rgba(120,255,124,.4)",
              }}
            >
              Confirm Subscription →
            </Link>

            <Text
              style={{
                marginTop: "24px",
                fontSize: "12px",
                color: "rgba(234,251,224,.6)",
              }}
            >
              If you didn’t request this, you can safely ignore this email.
            </Text>
          </Section>
        </Container>

        {/* Footer */}
        <Container style={{ maxWidth: "520px", marginTop: "16px" }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: "11px",
              color: "rgba(234,251,224,.45)",
            }}
          >
            © {new Date().getFullYear()} Your Store. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
