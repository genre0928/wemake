import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/leaderboard-page";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import { SectionHeader } from "~/common/components/section-header";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "리더보드 | Wemake" },
    { name: "description", content: "리더보드 페이지" },
  ];
};

export default function LeaderboardPage() {
  return (
    <div>
      {/* Hero 섹션 */}
      <Hero
        title="리더보드 페이지 타이틀"
        description="리더보드 페이지에 대한 간단한 설명입니다"
      />
      {/* 데일리 리더보드 섹션 */}
      <div className="grid grid-cols-3 gap-4 mb-40">
        <SectionHeader
          title="데일리 리더보드"
          description="하루동안 가장 인기 있는 제품을 확인해보세요."
          linkTo="/products/leaderboard"
          linkText="모든 리더보기 보러가기"
        />
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
        />))}
        <Button variant="link" asChild className="w-full text-lg p-0 self-center">
          <Link to="/products/leaderboards/daily">더 보기 &rarr;</Link>
        </Button>
      </div>
      {/* 주간 리더보드 섹션 */}
      <div className="grid grid-cols-3 gap-4 mb-40">
        <SectionHeader
          title="주간 리더보드"
          description="한 주동안 가장 인기 있는 제품을 확인해보세요."
          linkTo="/products/leaderboard"
          linkText="모든 리더보기 보러가기"
        />
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
        />))}
        <Button variant="link" asChild className="w-full text-lg p-0 self-center">
          <Link to="/products/leaderboards/weekly">더 보기 &rarr;</Link>
        </Button>
      </div>
      {/* 월간 리더보드 섹션 */}
      <div className="grid grid-cols-3 gap-4 mb-40">
        <SectionHeader
          title="월간 리더보드"
          description="한 달동안 가장 인기 있는 제품을 확인해보세요."
          linkTo="/products/leaderboard"
          linkText="모든 리더보기 보러가기"
        />
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
        />))}
        <Button variant="link" asChild className="w-full text-lg p-0 self-center">
          <Link to="/products/leaderboards/monthly">더 보기 &rarr;</Link>
        </Button>
      </div>
      {/* 연간 리더보드 섹션 */}
      <div className="grid grid-cols-3 gap-4 mb-40">
        <SectionHeader
          title="연간 리더보드"
          description="한 해동안 가장 인기 있는 제품을 확인해보세요."
          linkTo="/products/leaderboard"
          linkText="모든 리더보기 보러가기"
        />
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
        />))}
        <Button variant="link" asChild className="w-full text-lg p-0 self-center">
          <Link to="/products/leaderboards/yearly">더 보기 &rarr;</Link>
        </Button>
      </div>
    </div>
  )
}
