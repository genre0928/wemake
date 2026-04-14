import { EyeIcon, HeartIcon, MessageCircleIcon, StarIcon } from "lucide-react";
import { Link, NavLink, Outlet, useParams } from "react-router";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/product-overview-layout";
import { getProductById } from "../queries";
import { makeSSRClient } from "~/supa-client";
import { cn } from "~/lib/utils";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const product = await getProductById(client, Number(params.productId));
  return { product };
};

export default function ProductOverviewLayout({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex justify-between">
        {/* 제품 정보 섹션 */}
        <div className="flex gap-4">
          <div className="size-40 rounded-xl shadow-xl bg-primary/50">
            <img
              src={loaderData.product.icon}
              alt={loaderData.product.name}
              className="size-full object-cover"
            />
          </div>
          <div className="space-y-5">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{loaderData.product.name}</h1>
              <p className="text-2xl font-light">
                {loaderData.product.tags?.join(", ")}
              </p>
              <p className="text-sm text-muted-foreground">
                <Link to={`/products/${loaderData.product.product_id}/visit`}>
                  웹사이트 방문하기
                </Link>
              </p>
            </div>
            <div className="mt-5 flex items-center gap-2">
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, index) => {
                  const rating = Math.floor(
                    loaderData.product.average_rating ?? 0,
                  );
                  const isFilled = index < rating;
                  return (
                    <StarIcon
                      key={index}
                      className="size-4"
                      fill={isFilled ? "currentColor" : "none"}
                    />
                  );
                })}
              </div>
              <span className="font-medium">
                {loaderData.product.reviews}개의 리뷰
              </span>
            </div>
          </div>
        </div>
        {/* 좋아요 버튼 */}
        <div className="flex items-center justify-center">
          <Button variant="outline" className="size-24 flex flex-col cursor-pointer">
            <HeartIcon className={cn("size-4", loaderData.product.is_upvoted && "fill-red-500")} />
            <div>{loaderData.product.upvotes}</div>
          </Button>
        </div>
      </div>
      {/* Content */}
      <div className="flex gap-2">
        <NavLink
          to={`/products/${loaderData.product.product_id}/overview`}
          className={({ isActive }) =>
            isActive
              ? "bg-primary/50 font-bold rounded-xl"
              : "bg-transparent text-foreground"
          }
        >
          <Button variant="outline" asChild>
            <div className="flex items-center gap-2">
              <EyeIcon className="size-4" />
              미리 보기
            </div>
          </Button>
        </NavLink>

        <NavLink
          to={`/products/${loaderData.product.product_id}/reviews`}
          className={({ isActive }) =>
            isActive
              ? "bg-primary/50 font-bold rounded-xl"
              : "bg-transparent text-foreground"
          }
        >
          <Button variant="outline" asChild>
            <div className="flex items-center gap-2">
              <MessageCircleIcon className="size-4" />
              리뷰 보기
            </div>
          </Button>
        </NavLink>
      </div>
      {/* 미리보기, 리뷰보기 페이지 렌더링 */}
      <div>
        <Outlet
          context={{
            product_id: loaderData.product.product_id,
            description: loaderData.product.description,
            reviews: loaderData.product.reviews,
          }}
        />
      </div>
    </div>
  );
}
