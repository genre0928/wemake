import { DateTime } from "luxon";
import type { Route } from "./+types/daily-leaderboard-page";
import z from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import ProductPagination from "~/common/components/product-pagination";

export const meta: Route.MetaFunction = ({params}) => {
  const { year, month, day } = params;
  return [
    {title : `${year}년 ${month}월 ${day}일 리더보드 | Wemake`},
    {name : "description", content : `${year}년 ${month}월 ${day}일 리더보드 페이지`},
  ]
}

const paramsSchema = z.object({
  year: z.coerce.number(),
  month: z.coerce.number(),
  day: z.coerce.number(),
});

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { success, data } = paramsSchema.safeParse(params);
  if (!success) {
    throw new Error("Invalid parameters");
  }
  const date = DateTime.fromObject(data).setZone("Asia/Seoul");
  if (!date.isValid) {
    throw new Response("Invalid date", { status: 400 });
  }
  const today = DateTime.now().setZone("Asia/Seoul").startOf("day");
  if (date > today) {
    throw new Response("오늘보다 미래 날짜는 조회할 수 없습니다.", {
      status: 400,
    });
  }
  // JSON 직렬화를 위해 plain object로 반환 (DateTime은 클라이언트에서 문자열로 변환됨)
  return { ...data };
};

export default function DailyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  const { year, month, day } = loaderData;
  const urlDate = DateTime.fromObject({ year, month, day }).setZone(
    "Asia/Seoul",
  );
  const isToday = urlDate.equals(
    DateTime.now().setZone("Asia/Seoul").startOf("day"),
  );
  const previousDay = urlDate.minus({ days: 1 });
  const nextDay = urlDate.plus({ days: 1 });
  if (!previousDay.isValid) {
    throw new Response("Invalid date", { status: 400 });
  }
  if (!nextDay.isValid) {
    throw new Response("Invalid date", { status: 400 });
  }
  return (
    <div>
      <Hero
        title={`${year}년 ${month}월 ${day}일 리더보드`}
        description="하루동안 가장 인기 있는 제품을 확인해보세요."
      />
      <div className="flex justify-center gap-5 my-4">
        <Button variant="outline" asChild>
          <Link
            to={`/products/leaderboards/daily/${previousDay.year}/${previousDay.month}/${previousDay.day}`}
          >
            &larr; {previousDay.toLocaleString(DateTime.DATE_SHORT)}
          </Link>
        </Button>
        {isToday ? (
          <Button variant="outline" disabled>
            {nextDay.toLocaleString(DateTime.DATE_SHORT)}
          </Button>
        ) : (
          <Button variant="outline" asChild>
            <Link
              to={`/products/leaderboards/daily/${nextDay.year}/${nextDay.month}/${nextDay.day}`}
            >
              {nextDay.toLocaleString(DateTime.DATE_SHORT)} &rarr;
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
