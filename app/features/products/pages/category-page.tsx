import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import type { Route } from "./+types/category-page";
import ProductPagination from "~/common/components/product-pagination";
import z from "zod";
import { getCategoryById, getProductPagesByCategoryId, getProductsByCategoryId } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
  return [
    { title: `카테고리 이름 | Wemake` },
    { name: "description", content: "카테고리 확인" },
  ];
};

const paramsSchema = z.object({
  categoryId: z.coerce.number(),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { success, data } = paramsSchema.safeParse(params);
  if (!success) {
    throw new Error("Invalid parameters");
  }
  const { categoryId } = data;
  const { client } = makeSSRClient(request);
  const category = await getCategoryById(client, categoryId);
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") ?? "1");
  const products = await getProductsByCategoryId(client, { categoryId, page });
  const totalPages = await getProductPagesByCategoryId(client, { categoryId, page });
  return { category, products, totalPages };
};

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero
        title={loaderData.category.name}
        description={loaderData.category.description}
      />

      <div className="space-y-5 w-full max-w-3xl mx-auto">
        {loaderData.products.map((product) => (
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
      <ProductPagination totalPages={loaderData.totalPages} />
    </div>
  );
}
