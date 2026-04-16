import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

export default function WelcomeUser({ username }: { username: string }) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body>
            <Text className="text-2xl font-bold font-sans">Welcome {username}</Text>
        </Body>
      </Tailwind>
    </Html>
  );
}
