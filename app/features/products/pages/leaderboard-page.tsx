import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/leaderboard-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "리더보드 | Wemake" },
    { name: "description", content: "리더보드 페이지" },
  ];
};

export default function LeaderboardPage() {
  return (
    <div>
      <Hero
        title="리더보드 페이지 타이틀"
        description="리더보드 페이지에 대한 간단한 설명입니다"
      />
    </div>
  );
}
