import { useOutletContext } from "react-router";
import type { Route } from "./+types/product-overview-page";
import { makeSSRClient } from "~/supa-client";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await client.rpc("track_event", {
    event_type: "product_view",
    event_data: {
      product_id: Number(params.productId),
    },
  });
  return null;
};

export default function ProductOverviewPage({
  loaderData,
}: Route.ComponentProps) {
  const { product_id, description } = useOutletContext<{
    product_id: number;
    description: string;
  }>();
  return (
    <div>
      <div>{description}</div>
    </div>
  );
}
