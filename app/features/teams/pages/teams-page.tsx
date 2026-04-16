import { Hero } from "~/common/components/hero";
import { TeamCard } from "../components/team-card";
import { getTeams } from "../queries";
import type { Route } from "./+types/teams-page";
import { makeSSRClient } from "~/supa-client";

export const loader = async ({request} : Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const teams = await getTeams(client, { limit: 10 });
  return { teams };
};

export default function TeamsPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero title="모든 팀" description="현재 생성된 모든 팀을 확인해보세요" />
      <div className="grid grid-cols-4 gap-4">
        {loaderData.teams.map((team) => (
          <TeamCard
            key={team.team_id}
            teamId={team.team_id}
            title={team.name}
            description={team.description}
            tags={team.position.split(",")}
            authorNickname={team.team_leader.name}
            authorAvatarUrl={team.team_leader.avatar}
          />
        ))}
      </div>
    </div>
  );
}
