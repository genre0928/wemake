import { IdeaCard } from "~/features/ideas/components/idea-card";
import type { Route } from "./+types/dashboard-ideas-page";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "../queries";
import { getMyClaimedIdeas } from "~/features/ideas/queries";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const ideas = await getMyClaimedIdeas(client, { userId, limit: 10 });
  return { ideas };
};

export default function DashboardIdeasPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">아이디어</h1>
      <div className="grid grid-cols-4 gap-6">
        {loaderData.ideas.map((idea) => (
          <IdeaCard
            key={idea.idea_id}
            ideaId={idea.idea_id}
            title={idea.title}
            viewCount={idea.views}
            timeAgo={idea.created_at}
            likeCount={0}
            isLiked={false}
            isClaimed={!!idea.claimed_at}
            owner={true}
          />
        ))}
      </div>
    </div>
  );
}
