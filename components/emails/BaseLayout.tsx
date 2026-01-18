import * as React from "react";
import { Html, Head, Body, Container, Section } from "@react-email/components";

export function BaseLayout({ children }: { children: React.ReactNode }) {
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
            maxWidth: "560px",
            backgroundColor: "#050c08",
            border: "1px solid rgba(120,255,124,.25)",
            boxShadow: "0 0 30px rgba(120,255,124,.08)",
          }}
        >
          <Section style={{ padding: "32px" }}>{children}</Section>
        </Container>

        {/* Footer */}
        <Container style={{ maxWidth: "560px", marginTop: "16px" }}>
          <Section
            style={{
              textAlign: "center",
              fontSize: "11px",
              color: "rgba(234,251,224,.55)",
            }}
          >
            © {new Date().getFullYear()} Your Store. All rights reserved.
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
