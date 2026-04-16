import z from "zod";
import type { Route } from "./+types/search-page";
import { Hero } from "~/common/components/hero";
import { Form, useLoaderData } from "react-router";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import { ProductCard } from "../components/product-card";
import { getProductBySearch } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "검색 | Wemake" },
    { name: "description", content: "검색 페이지" },
  ];
};

const searchParamsSchema = z.object({
  query: z.string().optional().default(""),
  page: z.coerce.number().optional().default(1),
});

export async function loader({ request }: Route.LoaderArgs) {
  const { client } = makeSSRClient(request);
  const url = new URL(request.url);
  const { success, data } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams),
  );
  if (!success) {
    throw new Error("Invalid parameters");
  }
  const { query, page } = data;
  const products = await getProductBySearch(client, { query, page });
  return { query, page, products };
}

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  const { query, page } = useLoaderData<Route.ComponentProps["loaderData"]>();
  return (
    <div className="space-y-20">
      <Hero
        title="검색"
        description={
          query
            ? `"${query}"에 대한 검색 결과입니다`
            : "검색하고자 하는 키워드를 입력하세요"
        }
      />
      <Form className="flex justify-center items-center gap-2 max-w-2xl mx-auto">
        <Input type="text" name="query" placeholder="검색어를 입력하세요" />
        <Button type="submit">검색</Button>
      </Form>
      <div className="space-y-4 w-full max-w-3xl mx-auto mb-10">
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
    </div>
  );
}
