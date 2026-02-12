import { DateTime } from "luxon";
import type { Route } from "./+types/monthly-leaderboard-page";
import z from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import ProductPagination from "~/common/components/product-pagination";

export const meta: Route.MetaFunction = ({params}) => {
  const { year, month } = params;
  return [
    {title : `${year}년 ${month}월 리더보드 | Wemake`},
    {name : "description", content : `${year}년 ${month}월 리더보드 페이지`},
  ]
}

const paramsSchema = z.object({
  year: z.coerce.number(),
  month: z.coerce.number(),
});

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { success, data } = paramsSchema.safeParse(params);
  if (!success) {
    throw new Error("Invalid parameters");
  }
  const date = DateTime.fromObject({
    year: data.year,
    month: data.month,
  }).setZone("Asia/Seoul");
  if (!date.isValid) {
    throw new Response("Invalid month", { status: 400 });
  }
  const now = DateTime.now().setZone("Asia/Seoul");
  if (date > now) {
    throw new Response("오늘보다 미래 월은 조회할 수 없습니다.", {
      status: 400,
    });
  }
  return { year: data.year, month: data.month };
};

export default function MonthlyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  const { year, month } = loaderData;
  const urlDate = DateTime.fromObject({ year, month }).setZone("Asia/Seoul");
  const now = DateTime.now().setZone("Asia/Seoul");
  const isCurrentMonth =
    urlDate.year === now.year && urlDate.month === now.month;
  const previousMonth = urlDate.minus({ months: 1 });
  const nextMonth = urlDate.plus({ months: 1 });
  if (!previousMonth.isValid) {
    throw new Response("Invalid month", { status: 400 });
  }
  if (!nextMonth.isValid) {
    throw new Response("Invalid month", { status: 400 });
  }
  return (
    <div>
      <Hero
        title={`${year}년 ${month}월 리더보드`}
        description="한 달동안 가장 인기 있는 제품을 확인해보세요."
      />
      <div className="flex justify-center gap-5 my-4">
        <Button variant="outline" asChild>
          <Link
            to={`/products/leaderboards/monthly/${previousMonth.year}/${previousMonth.month}`}
          >
            &larr; {previousMonth.year}년 {previousMonth.month}월
          </Link>
        </Button>
        {isCurrentMonth ? (
          <Button variant="outline" disabled>
            {nextMonth.year}년 {nextMonth.month}월
          </Button>
        ) : (
          <Button variant="outline" asChild>
            <Link
              to={`/products/leaderboards/monthly/${nextMonth.year}/${nextMonth.month}`}
            >
              {nextMonth.year}년 {nextMonth.month}월 &rarr;
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
