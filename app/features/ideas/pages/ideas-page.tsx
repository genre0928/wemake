import { Hero } from "~/common/components/hero";
import { IdeaCard } from "../components/idea-card";
import { getIdeas } from "../queries";
import type { Route } from "./+types/ideas-page";
import { makeSSRClient } from "~/supa-client";

export const loader = async ({request} : Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const ideas = await getIdeas(client, { limit: 10 });
  return { ideas };
}

export default function IdeasPage({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <Hero title="아이디어" description="아이디어 페이지" />
      <div className="grid grid-cols-4 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loaderData.ideas.map((idea) => (
            <IdeaCard
            key={idea.idea_id}
            ideaId={idea.idea_id}
            title={idea.title}
            viewCount={idea.views}
            timeAgo={idea.created_at}
            likeCount={idea.upvotes}
            isLiked={false}
            isClaimed={idea.is_claimed}
          />))}
      </div>
    </div>
  );
}
