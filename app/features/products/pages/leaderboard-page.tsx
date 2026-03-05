import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/leaderboard-page";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import { SectionHeader } from "~/common/components/section-header";
import { getProducts } from "../queries";
import ProductLeaderboard from "../components/product-leaderboard";
import { useMemo } from "react";

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

  const leaderboardData = useMemo(() => {
    if (!products) {
      return {
        daily: [],
        weekly: [],
        monthly: [],
        yearly: [],
      };
    }

    const now = new Date();

    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const startOfYear = new Date(now.getFullYear(), 0, 1);

    return {
      daily: products.filter((p) => new Date(p.created_at) >= startOfDay),

      weekly: products.filter((p) => new Date(p.created_at) >= startOfWeek),

      monthly: products.filter((p) => new Date(p.created_at) >= startOfMonth),

      yearly: products.filter((p) => new Date(p.created_at) >= startOfYear),
    };
  }, [products]);

  return (
    <div>
      {/* Hero 섹션 */}
      <Hero
        title="제품 리더보드 페이지"
        description="현재 등록된 기간별 인기 제품을 한 곳에서 확인해보세요"
      />
      <div className="space-y-30">
        {/* 리더보드 컴포넌트 테스트 섹션 */}
        <ProductLeaderboard products={leaderboardData.daily} period="daily" />
        <ProductLeaderboard products={leaderboardData.weekly} period="weekly" />
        <ProductLeaderboard
          products={leaderboardData.monthly}
          period="monthly"
        />
        <ProductLeaderboard products={leaderboardData.yearly} period="yearly" />
      </div>
    </div>
  );
}
