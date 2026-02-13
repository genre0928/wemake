import z from "zod";
import type { Route } from "./+types/search-page";
import { Hero } from "~/common/components/hero";
import { Form } from "react-router";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import { ProductCard } from "../components/product-card";

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

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const { success, data } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams),
  );
  if (!success) {
    throw new Error("Invalid parameters");
  }
  const { query, page } = data;
  return { query, page };
}

export default function SearchPage() {
  return (
    <div className="space-y-20">
      <Hero title="검색" description="찾고자 하는 키워드를 검색해주세요" />
      <Form className="flex justify-center items-center gap-2 max-w-2xl mx-auto">
        <Input type="text" name="query" placeholder="검색어를 입력하세요" />
        <Button type="submit">검색</Button>
      </Form>
      <div className="space-y-4 w-full max-w-3xl mx-auto mb-10">
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
          />
        ))}
      </div>
    </div>
  );
}
