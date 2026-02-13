import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import type { Route } from "./+types/category-page";
import ProductPagination from "~/common/components/product-pagination";

export const meta: Route.MetaFunction = ({ params }) => {
  const { category } = params;
  return [
    { title: `카테고리 이름 | Wemake` },
    { name: "description", content: `카테고리 이름 제품을 확인해보세요` },
  ];
};

export default function CategoryPage() {
  return (
    <div className="space-y-10">
      <Hero title={"카테고리 이름"} description={"카테고리 설명"} />

      <div className="space-y-5 w-full max-w-3xl mx-auto">
        {Array.from({ length: 11 }).map((_, index) => (
          <ProductCard
            key={`productId-${index}`}
            productId={`productId-${index}`}
            name="제품명"
            description="제품 설명"
            commentCount={10}
            viewCount={10}
            likeCount={10}
            isLiked={false}
          />
        ))}
      </div>
      <ProductPagination totalPages={10} />
    </div>
  );
}
