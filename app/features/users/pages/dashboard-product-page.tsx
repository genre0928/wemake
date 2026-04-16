import { Area, AreaChart, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/common/components/ui/chart";
import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/dashboard-product-page";
import { getLoggedInUserId } from "../queries";
import { redirect } from "react-router";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const { error } = await client
    .from("products")
    .select("product_id")
    .eq("profile_id", userId)
    .eq("product_id", Number(params.productId))
    .single();
  if (error) {
    throw redirect("/my/dashboard");
  }

  const { data, error: productError } = await client.rpc("get_product_stats", {
    product_id: params.productId,
  });
  if (productError) {
    throw new Error(productError.message);
  }
  return { chartData: data };
};

const chartConfig = {
  views: {
    label: "👁️",
    color: "var(--color-chart-1)",
  },
  visitior: {
    label: "👤",
    color: "var(--color-chart-2)",
  },
} as ChartConfig;

export default function DashboardProductPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">상품 판매 분석</h1>
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>방문자 수</CardTitle>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={loaderData.chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  padding={{ left: 15, right: 15 }}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel indicator="line" />}
                />
                <Area
                  dataKey="product_views"
                  type="natural"
                  strokeWidth={2}
                  dot={false}
                />
                <Area
                  dataKey="product_reviews"
                  type="natural"
                  strokeWidth={2}
                  dot={false}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
