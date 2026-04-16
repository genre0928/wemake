import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/categories-page";
import { CategoryCard } from "../components/category-card";
import { getCategories } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const categories = await getCategories(client);
  return { categories };
};

export const meta: Route.MetaFunction = () => {
  return [
    { title: "카테고리 | Wemake" },
    { name: "description", content: "카테고리 페이지" },
  ];
};

export default function CategoriesPage({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <Hero
        title="카테고리 모음"
        description="카테고리별로 제품을 확인해보세요"
      />
      <div className="grid grid-cols-4 gap-10">
        {loaderData.categories.map((category) => (
          <CategoryCard
            key={category.category_id}
            id={category.category_id}
            name={category.name}
            description={category.description}
          />
        ))}
      </div>
    </div>
  );
}
