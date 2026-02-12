import { DateTime } from "luxon";
import type { Route } from "./+types/weekly-leaderboard-page";
import z from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import ProductPagination from "~/common/components/product-pagination";

export const meta: Route.MetaFunction = ({params}) => {
  const { year, week } = params;
  return [
    {title : `${year}년 ${week}주 리더보드 | Wemake`},
    {name : "description", content : `${year}년 ${week}주 리더보드 페이지`},
  ]
}

const paramsSchema = z.object({
  year: z.coerce.number(),
  week: z.coerce.number(),
});

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { success, data } = paramsSchema.safeParse(params);
  if (!success) {
    throw new Error("Invalid parameters");
  }
  const date = DateTime.fromObject({ weekYear: data.year, weekNumber: data.week }).setZone("Asia/Seoul");
  if (!date.isValid) {
    throw new Response("Invalid week", { status: 400 });
  }
  const now = DateTime.now().setZone("Asia/Seoul");
  if (date > now) {
    throw new Response("오늘보다 미래 주는 조회할 수 없습니다.", {
      status: 400,
    });
  }
  return { year: data.year, week: data.week };
};

export default function WeeklyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  const { year, week } = loaderData;
  const urlDate = DateTime.fromObject({ weekYear: year, weekNumber: week }).setZone(
    "Asia/Seoul",
  );
  const now = DateTime.now().setZone("Asia/Seoul");
  const isToday = urlDate.weekNumber === now.weekNumber && urlDate.weekYear === now.weekYear;
  const previousWeek = urlDate.minus({ weeks: 1 });
  const nextWeek = urlDate.plus({ weeks: 1 });
  if (!previousWeek.isValid) {
    throw new Response("Invalid week", { status: 400 });
  }
  if (!nextWeek.isValid) {
    throw new Response("Invalid week", { status: 400 });
  }
  return (
    <div>
      <Hero
        title={`${year}년 ${week}주 리더보드`}
        description="한 주동안 가장 인기 있는 제품을 확인해보세요."
      />
      <div className="flex justify-center gap-5 my-4">
        <Button variant="outline" asChild>
          <Link
            to={`/products/leaderboards/weekly/${previousWeek.weekYear}/${previousWeek.weekNumber}`}
          >
            &larr; {previousWeek.weekYear}년 {previousWeek.weekNumber}주
          </Link>
        </Button>
        {isToday ? (
          <Button variant="outline" disabled>
            {nextWeek.weekYear}년 {nextWeek.weekNumber}주
          </Button>
        ) : (
          <Button variant="outline" asChild>
            <Link
              to={`/products/leaderboards/weekly/${nextWeek.weekYear}/${nextWeek.weekNumber}`}
            >
              {nextWeek.weekYear}년 {nextWeek.weekNumber}주 &rarr;
            </Link>
          </Button>
        )}
      </div>
      <div className="space-y-4 w-full max-w-3xl mx-auto mb-10">
        {Array.from({ length: 7 }).map((_, index) => (
          <ProductCard
            key={index}
            productId="productId"
            name="제품명"
            description="제품 설명"
            commentCount={10}
            viewCount={10}
            likeCount={10}
            isLiked={false}
          />
        ))}
      </div>
      <div>
        <ProductPagination totalPages={10} />
      </div>
    </div>
  );
}
