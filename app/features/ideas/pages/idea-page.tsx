import { Hero } from "~/common/components/hero";
import { IdeaCard } from "../components/idea-card";
import type { Route } from "./+types/idea-page";
import { useParams } from "react-router";
import { DotIcon, EyeIcon, HeartIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { getIdea, getIdeas } from "../queries";
import { DateTime } from "luxon";

export const meta = ({ loaderData }: Route.ComponentProps) => {
  return [
    { title: `${loaderData.idea.title} | Wemake` },
    { name: "description", content: loaderData.idea.description },
  ];
};

export const loader = async ({ params }: Route.LoaderArgs) => {
  const idea = await getIdea(Number(params.ideaId));
  return { idea };
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
          <Button>아이디어 구매하기 &rarr;</Button>
        </div>
      </div>
    </div>
  );
}
