import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/categories-page";
import { CategoryCard } from "../components/category-card";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "카테고리 | Wemake" },
    { name: "description", content: "카테고리 페이지" },
  ];
};

export default function CategoriesPage() {
  return (
    <div className="space-y-10">
      <Hero
        title="카테고리 모음"
        description="카테고리별로 제품을 확인해보세요"
      />
      <div className="grid grid-cols-4 gap-10">
        {Array.from({ length: 10 }).map((_, index) => (
          <CategoryCard
            key={`categoryId-${index}`}
            id={`categoryId-${index}`}
            name="카테고리 이름"
            description="카테고리 설명"
          />
        ))}
      </div>
    </div>
  );
}
