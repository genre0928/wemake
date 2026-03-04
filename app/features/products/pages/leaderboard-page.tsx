import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/leaderboard-page";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import { SectionHeader } from "~/common/components/section-header";
import { getProducts } from "../queries";
import ProductLeaderboard from "../components/product-leaderboard";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "리더보드 | Wemake" },
    { name: "description", content: "리더보드 페이지" },
  ];
};

export const loader = async () => {
  const products = await getProducts();
  return { products };
};

export default function LeaderboardPage({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData;
  return (
    <div>
      {/* Hero 섹션 */}
      <Hero
        title="제품 리더보드 페이지"
        description="현재 등록된 모든 제품을 한 곳에서 확인해보세요"
      />
      <div className="space-y-30">
        {/* 리더보드 컴포넌트 테스트 섹션 */}
        <ProductLeaderboard products={products} period="daily" />
        <ProductLeaderboard products={products} period="weekly" />
        <ProductLeaderboard products={products} period="monthly" />
        <ProductLeaderboard products={products} period="yearly" />
      </div>
    </div>
  );
}
