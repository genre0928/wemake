import { Hero } from "~/common/components/hero";
import { IdeaCard } from "../components/idea-card";
import type { Route } from "./+types/idea-page";
import { Form, redirect, useParams } from "react-router";
import { DotIcon, EyeIcon, HeartIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { getIdea, getIdeas } from "../queries";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { claimIdea } from "../mutations";

export const meta = ({ loaderData }: Route.ComponentProps) => {
  return [
    { title: `${loaderData.idea.title} | Wemake` },
    { name: "description", content: loaderData.idea.description },
  ];
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const idea = await getIdea(client, Number(params.ideaId));
  if (idea.is_claimed) {
    return redirect("/ideas");
  }
  return { idea };
};

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const idea = await getIdea(client, Number(params.ideaId));
  if (idea.is_claimed) {
    return { isClaimed: true };
  }
  await claimIdea(client, { ideaId: Number(params.ideaId), userId });
  return redirect("/my/dashboard/ideas");
};

export default function IdeaPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero title={loaderData.idea.title} />
      <div className="flex flex-col items-center mx-auto gap-10">
        <div>{loaderData.idea.description}</div>
        <div className="flex gap-10">
          <div className="flex items-center gap-1 text-sm leading-tight">
            <EyeIcon className="size-4" />
            <span>{loaderData.idea.views}</span>
            <DotIcon className="size-4" />
            <span>
              {DateTime.fromISO(loaderData.idea.created_at).toRelative()}
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm leading-tight">
            <HeartIcon className="size-4" />
            <span>{loaderData.idea.upvotes}</span>
          </div>
        </div>
        <div>
          <Form method="post">
            <Button
              disabled={loaderData.idea.is_claimed}
              className="cursor-pointer"
            >
              {loaderData.idea.is_claimed
                ? "이미 판매된 아이디어입니다"
                : "아이디어 구매하기"}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
