import { Link } from "react-router";
import { ProductCard } from "./product-card";
import { SectionHeader } from "~/common/components/section-header";
import { Button } from "~/common/components/ui/button";
import type { Tables } from "database.types";

type ProductFromView = Tables<"product_list_view">;

interface ProductLeaderboardProps {
  products: ProductFromView[];
  period: "daily" | "weekly" | "monthly" | "yearly";
}
export default function ProductLeaderboard({
  products,
  period,
}: ProductLeaderboardProps) {
  const periodTitles = {
    daily: {
      title: "데일리",
      description: "하루동안 가장 인기 있는 제품을 확인해보세요.",
    },
    weekly: {
      title: "주간",
      description: "한 주동안 가장 인기 있는 제품을 확인해보세요.",
    },
    monthly: {
      title: "월간",
      description: "한 달동안 가장 인기 있는 제품을 확인해보세요.",
    },
    yearly: {
      title: "연간",
      description: "한 해동안 가장 인기 있는 제품을 확인해보세요.",
    },
  };
  const periodProducts = products

  return (
    <div className="grid grid-cols-3 gap-4">
      <SectionHeader
        title={`${periodTitles[period].title} 리더보드`}
        description={periodTitles[period].description}
      />
      {products.map((product) => {
        const stats = product.stats as {
          views?: number | null;
          reviews?: number | null;
        } | null;

        return (
          <ProductCard
            key={product.product_id ?? 0}
            productId={product.product_id ?? ""}
            name={product.name ?? ""}
            description={product.description ?? ""}
            viewCount={stats?.views ?? 0}
            commentCount={stats?.reviews ?? 0}
            likeCount={product.upvotes ?? 0}
            isLiked={false}
            createdAt={product.created_at ?? ""}
          />
        );
      })}
      <Button
        variant="link"
        asChild
        className="w-full text-lg p-0 self-center min-h-[138px]"
      >
        <Link to={`/products/leaderboards/${period}`}>더 보기 &rarr;</Link>
      </Button>
    </div>
  );
}
