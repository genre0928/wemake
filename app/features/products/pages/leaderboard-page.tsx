import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/leaderboard-page";

import { getProductsByDateRange } from "../queries";
import z from "zod";
import { DateTime } from "luxon";
import { SectionHeader } from "~/common/components/section-header";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "리더보드 | Wemake" },
    { name: "description", content: "리더보드 페이지" },
  ];
};

const paramsSchema = z.object({
  year: z.coerce.number(),
  month: z.coerce.number(),
  day: z.coerce.number(),
});

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const [dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts] = await Promise.all([
    getProductsByDateRange(client, {
      startDate: DateTime.now().startOf("day"),
      endDate: DateTime.now().endOf("day"),
      limit: 7,
    }),
    getProductsByDateRange(client, {
      startDate: DateTime.now().startOf("week"),
      endDate: DateTime.now().endOf("week"),
      limit: 7,
    }),
    getProductsByDateRange(client, {
      startDate: DateTime.now().startOf("month"),
      endDate: DateTime.now().endOf("month"),
      limit: 7,
    }),
    getProductsByDateRange(client, {
      startDate: DateTime.now().startOf("year"),
      endDate: DateTime.now().endOf("year"),
      limit: 7,
    }),
  ]);
  return { dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts };
};

export default function LeaderboardPage({ loaderData }: Route.ComponentProps) {
  const { dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts } =
    loaderData;
    const today = DateTime.now().setZone("Asia/Seoul");
  return (
    <div>
      {/* Hero 섹션 */}
      <Hero
        title="제품 리더보드 페이지"
        description="현재 등록된 기간별 인기 제품을 한 곳에서 확인해보세요"
      />
      <div className="space-y-30">
        {/* 데일리 리더보드 섹션 */}
        <div className="grid grid-cols-3 gap-4">
          <SectionHeader
            title="데일리 리더보드"
            description="하루동안 가장 인기 있는 제품을 확인해보세요."
          />
          {dailyProducts.map((product) => (
            <ProductCard
              key={product.product_id}
              productId={product.product_id}
              name={product.name}
              description={product.description}
              reviews={product.reviews}
              views={product.views}
              upvotes={product.upvotes}
              createdAt={product.created_at}
            />
          ))}
          <Button
            variant="link"
            asChild
            className="w-full text-lg p-0 self-center"
          >
            <Link to={`/products/leaderboards/daily/${today.year}/${today.month}/${today.day}`}>더 보기 &rarr;</Link>
          </Button>
        </div>
        {/* 주간 리더보드 섹션 */}
        <div className="grid grid-cols-3 gap-4">
          <SectionHeader
            title="주간 리더보드"
            description="한 주동안 가장 인기 있는 제품을 확인해보세요."
          />
          {weeklyProducts.map((product) => (
            <ProductCard
              key={product.product_id}
              productId={product.product_id}
              name={product.name}
              description={product.description}
              reviews={product.reviews}
              views={product.views}
              upvotes={product.upvotes}
              createdAt={product.created_at}
            />
          ))}
          <Button
            variant="link"
            asChild
            className="w-full text-lg p-0 self-center"
          >
            <Link to={`/products/leaderboards/weekly/${today.year}/${today.weekNumber}`}>더 보기 &rarr;</Link>
          </Button>
        </div>
        {/* 월간 리더보드 섹션 */}
        <div className="grid grid-cols-3 gap-4">
          <SectionHeader
            title="월간 리더보드"
            description="한 달동안 가장 인기 있는 제품을 확인해보세요."
          />
          {monthlyProducts.map((product) => (
            <ProductCard
              key={product.product_id}
              productId={product.product_id}
              name={product.name}
              description={product.description}
              reviews={product.reviews}
              views={product.views}
              upvotes={product.upvotes}
              createdAt={product.created_at}
            />
          ))}
          <Button
            variant="link"
            asChild
            className="w-full text-lg p-0 self-center"
          >
            <Link to={`/products/leaderboards/monthly/${today.year}/${today.month}`}>더 보기 &rarr;</Link>
          </Button>
        </div>
        {/* 연간 리더보드 섹션 */}
        <div className="grid grid-cols-3 gap-4">
          <SectionHeader
            title="연간 리더보드"
            description="한 해동안 가장 인기 있는 제품을 확인해보세요."
          />
          {yearlyProducts.map((product) => (
            <ProductCard
              key={product.product_id}
              productId={product.product_id}
              name={product.name}
              description={product.description}
              reviews={product.reviews}
              views={product.views}
              upvotes={product.upvotes}
              createdAt={product.created_at}
            />
          ))}
          <Button
            variant="link"
            asChild
            className="w-full text-lg p-0 self-center"
          >
            <Link to={`/products/leaderboards/yearly/${today.year}`}>더 보기 &rarr;</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
