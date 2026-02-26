import { Hero } from "~/common/components/hero";
import { TeamCard } from "../components/team-card";

export default function TeamsPage() {
  return (
    <div className="space-y-10">
      <Hero title="팀" description="팀 페이지" />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <TeamCard
            key={index}
            teamId={`teamId-${index}`}
            title="팀 이름"
            description="팀 설명"
            tags={["태그1", "태그2", "태그3"]}
            authorNickname="닉네임"
            authorAvatarUrl="https://github.com/shadcn.png"
            authorAvatarFallback="N"
          />
        ))}
      </div>
    </div>
  );
}
