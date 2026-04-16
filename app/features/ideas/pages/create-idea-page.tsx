import OpenAi from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import z from "zod";
import { insertIdeas } from "../mutations";
import { adminClient } from "~/supa-client";
import type { Route } from "./+types/create-idea-page";

const openai = new OpenAi();

const IdeaSchema = z.object({
  title: z.string(),
  description: z.string(),
  problem: z.string(),
  solution: z.string(),
  category: z.enum(["tech", "business", "design", "marketing", "other"]),
});

const ResponseSchema = z.object({
  ideas: z.array(IdeaSchema).length(10),
});

export const action = async ({ request }: Route.ActionArgs) => {
  if (request.method !== "POST") {
    return Response.json(
      {
        error: "Method not allowed",
      },
      { status: 404 },
    );
  }
  const header = request.headers.get("1234");
  if (!header || header !== "1234") {
    return Response.json(
      {
        error: "Unauthorized",
      },
      { status: 401 },
    );
  }
  const completion = await openai.chat.completions.parse({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: "카테고리 주제에 맞는 제품 아이디어 생성해줘",
      },
      {
        role: "user",
        content: "10개의 아이디어를 생성해줘",
      },
    ],
    response_format: zodResponseFormat(ResponseSchema, "ideas"),
  });
  const descriptions = completion.choices[0].message.parsed?.ideas.map(
    (idea) => idea.description,
  );
  if (descriptions) {
    await insertIdeas(adminClient, { descriptions });
  }
  return Response.json({
    descriptions,
  });
};
