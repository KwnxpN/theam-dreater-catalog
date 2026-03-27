import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
  pixelBasedPreset,
} from "@react-email/components";
import { emailTailwindTheme } from "./theme";

interface EmailProps {
  message: string;
}

export const Email = ({ message }: EmailProps) => {
  const normalizedMessage = message.trim() || "No message was provided.";

  return (
    <Html>
      <Head />
      <Preview>New customer feedback message</Preview>
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
          theme: emailTailwindTheme,
        }}
      >
        <Body className="bg-background px-3 py-8 font-sans">
          <Container className="mx-auto max-w-xl rounded-lg border border-border bg-card p-6">
            <Section>
              <Text className="m-0 text-xs uppercase tracking-wide text-muted-foreground">
                Theam Dreater Feedback
              </Text>
              <Heading className="mt-2 mb-0 text-2xl leading-8 text-foreground">
                New Customer Message
              </Heading>
              <Text className="mt-2 mb-0 text-sm leading-6 text-muted-foreground">
                A customer sent feedback from the website form.
              </Text>
            </Section>

            <Hr className="my-5 border-border" />

            <Section className="rounded-md bg-muted p-4">
              <Text className="m-0 text-xs uppercase tracking-wide text-muted-foreground">
                Message
              </Text>
              <Text
                className="mt-3 mb-0 text-base leading-7 text-foreground"
                style={{ whiteSpace: "pre-line" }}
              >
                {normalizedMessage}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

Email.PreviewProps = {
  message: "Hello World",
} as EmailProps;

export default Email;