import { Resend } from "resend";
import { render } from "@react-email/components";
import type { Route } from "./+types/messages-page";
import WelcomeUser from "react-email-starter/emails/welcome-user";

const client = new Resend(process.env.RESEND_API_KEY);

export const loader = async ({ params }: Route.LoaderArgs) => {
  const emailHtml = await render(
    <WelcomeUser username={(params as { nickname: string }).nickname ?? ""} />,
  );
  const { data, error } = await client.emails.send({
    from: "onboarding@mail.wemake.autos",
    to: "genre0928@naver.com",
    subject: "Hello world",
    html: emailHtml,
  });
  return Response.json({ data, error, emailHtml });
};
