import type { Route } from "./+types/home-page";
import { ProductCard } from "~/features/products/components/product-card";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Home | Wemake" },
    { name: "description", content: "Home page of Wemake" },
  ];
};

export default function HomePage() {
  return (
    <div className="px-20">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            오늘의 제품
          </h2>
          <p className="text-xl font-light text-foreground">
            커뮤니티에서 가장 인기 있는 제품을 확인해보세요.
          </p>
        </div>
        <div>
          <ProductCard
            productId="productId"
            name="제품명"
            description="제품 설명"
            commentCount={10}
            viewCount={10}
            likeCount={10}
            isLiked={false}
          />
        </div>
      </div>
    </div>
  );
}
