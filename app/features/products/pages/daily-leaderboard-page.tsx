import { DateTime } from "luxon";
import type { Route } from "./+types/daily-leaderboard-page";
import z from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import ProductPagination from "~/common/components/product-pagination";
import { getProductPagesByDateRange, getProductsByDateRange } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = ({ params }) => {
  const { year, month, day } = params;
  return [
    { title: `${year}년 ${month}월 ${day}일 리더보드 | Wemake` },
    {
      name: "description",
      content: `${year}년 ${month}월 ${day}일 리더보드 페이지`,
    },
  ];
};

const paramsSchema = z.object({
  year: z.coerce.number(),
  month: z.coerce.number(),
  day: z.coerce.number(),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
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

  const url = new URL(request.url);

  const products = await getProductsByDateRange(client, {
    startDate: date.startOf("day"),
    endDate: date.endOf("day"),
    limit: 15,
    page: Number(url.searchParams.get("page") ?? "1"),
  });

  const totalPages = await getProductPagesByDateRange(client, {
    startDate: date.startOf("day"),
    endDate: date.endOf("day"),
  });

  return { data, products, totalPages };
};

export default function DailyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  const { data, products, totalPages } = loaderData;
  const { year, month, day } = data;
  const urlDate = DateTime.fromObject(data).setZone("Asia/Seoul");
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
        {products.map((product) => (
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
      </div>
      <div>
        <ProductPagination totalPages={totalPages} />
      </div>
    </div>
  );
}
