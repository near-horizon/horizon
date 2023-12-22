import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";
import twConfig from "../../tailwind.config";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export default function VerificationEmail({
  code = "123456",
}: {
  code: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>Your email verification code</Preview>
      <Tailwind config={twConfig}>
        <Body className="bg-white">
          <Container className="w-[560px] px-12 pb-0 pt-5">
            <Img
              src={`${baseUrl}/logo.svg`}
              width={100}
              height={42}
              alt="NEAR Horizon"
            />
            <Heading className="text-2xl text-gray-900">
              Your email verification code for NEAR Horizon
            </Heading>
            <Text className="text-base text-gray-700">
              This code will only be valid for the next 5 minutes.
            </Text>
            <code className="rounded bg-gray-400 px-1 py-px text-xl font-bold text-gray-900">
              {code}
            </code>
            <Hr className="mx-7 mb-0 mt-11 border-gray-900" />
            <Link href="https://app.hzn.xyz" className="text-sm text-blue-400">
              NEAR Horizon
            </Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
