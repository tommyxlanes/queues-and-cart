import * as React from "react";
import { Heading, Text, Button, Hr } from "@react-email/components";
import { BaseLayout } from "./BaseLayout";

type Props = {
  name?: string;
};

export function WelcomeEmail({ name }: Props) {
  return (
    <BaseLayout>
      <Heading
        style={{
          color: "#78ff7c",
          textShadow: "0 0 8px rgba(120,255,124,.45)",
          fontSize: "24px",
          marginBottom: "16px",
        }}
      >
        Welcome to the Vault
      </Heading>

      <Text style={{ color: "#eafbe0", fontSize: "14px" }}>
        {name ? `Hey ${name},` : "Hey,"}
      </Text>

      <Text style={{ color: "#eafbe0", fontSize: "14px", lineHeight: "20px" }}>
        You’re officially in. Exclusive drops, limited inventory, and high-tier
        pulls await.
      </Text>

      <Hr style={{ borderColor: "rgba(120,255,124,.25)", margin: "24px 0" }} />

      <Text style={{ color: "#eafbe0", fontSize: "13px" }}>
        Start exploring the store or grab a pack while supplies last.
      </Text>

      <Button
        href={`${process.env.NEXT_PUBLIC_APP_URL}/store`}
        style={{
          display: "inline-block",
          marginTop: "16px",
          backgroundColor: "rgba(120,255,124,.15)",
          border: "1px solid rgba(120,255,124,.45)",
          color: "#78ff7c",
          padding: "12px 20px",
          textDecoration: "none",
          fontWeight: "bold",
          textShadow: "0 0 6px rgba(120,255,124,.4)",
        }}
      >
        Enter Store →
      </Button>

      <Text
        style={{
          marginTop: "24px",
          fontSize: "12px",
          color: "rgba(234,251,224,.6)",
        }}
      >
        If you didn’t create this account, you can safely ignore this email.
      </Text>
    </BaseLayout>
  );
}
