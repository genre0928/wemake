import { DateTime } from "luxon";
import type { Route } from "./+types/yearly-leaderboard-page";
import z from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import ProductPagination from "~/common/components/product-pagination";

export const meta: Route.MetaFunction = ({ params }) => {
  const { year } = params;
  return [
    { title: `${year}년 리더보드 | Wemake` },
    { name: "description", content: `${year}년 리더보드 페이지` },
  ];
};

const paramsSchema = z.object({
  year: z.coerce.number(),
});

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { success, data } = paramsSchema.safeParse(params);
  if (!success) {
    throw new Error("Invalid parameters");
  }
  const date = DateTime.fromObject({ year: data.year }).setZone("Asia/Seoul");
  if (!date.isValid) {
    throw new Response("Invalid year", { status: 400 });
  }
  const now = DateTime.now().setZone("Asia/Seoul");
  if (date > now) {
    throw new Response("오늘보다 미래 연도는 조회할 수 없습니다.", {
      status: 400,
    });
  }
  return { year: data.year };
};

export default function YearlyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  const { year } = loaderData;
  const urlDate = DateTime.fromObject({ year }).setZone("Asia/Seoul");
  const now = DateTime.now().setZone("Asia/Seoul");
  const isCurrentYear = urlDate.year === now.year;
  const previousYear = urlDate.minus({ years: 1 });
  const nextYear = urlDate.plus({ years: 1 });
  if (!previousYear.isValid) {
    throw new Response("Invalid year", { status: 400 });
  }
  if (!nextYear.isValid) {
    throw new Response("Invalid year", { status: 400 });
  }
  return (
    <div>
      <Hero
        title={`${year}년 리더보드`}
        description="한 해동안 가장 인기 있는 제품을 확인해보세요."
      />
      <div className="flex justify-center gap-5 my-4">
        <Button variant="outline" asChild>
          <Link to={`/products/leaderboards/yearly/${previousYear.year}`}>
            &larr; {previousYear.year}년
          </Link>
        </Button>
        {isCurrentYear ? (
          <Button variant="outline" disabled>
            {nextYear.year}년
          </Button>
        ) : (
          <Button variant="outline" asChild>
            <Link to={`/products/leaderboards/yearly/${nextYear.year}`}>
              {nextYear.year}년 &rarr;
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
