import { ProductCard } from "~/features/products/components/product-card";
import type { Route } from "./+types/profile-products-page";
import { useOutletContext } from "react-router";
import { getUserProducts } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const products = await getUserProducts(client, params.nickname);
  return { products };
};

export default function ProfileProductsPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="space-y-5">
      {loaderData.products.map((product) => (
        <ProductCard
          key={product.product_id}
          productId={product.product_id.toString()}
          name={product.name}
          description={product.description}
          reviews={product.reviews.toString()}
          views={product.views.toString()}
          upvotes={product.upvotes.toString()}
          createdAt={product.created_at.toString()}
        />
      ))}
    </div>
  );
}
