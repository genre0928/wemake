import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "~/common/components/ui/chart";
import { LineChart } from "recharts";
import { XAxis } from "recharts";
import { ChartTooltipContent } from "~/common/components/ui/chart";
import { Line } from "recharts";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "../queries";
import type { Route } from "./+types/dashboard-page";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const { data, error } = await client.rpc("get_dashboard_stats", {
    user_id: userId,
  });
  if (error) {
    throw new Error(error.message);
  }
  const stats = data ?? [];
  return { stats };
};

const chartConfig = {
  views: {
    label: "👁️",
    color: "var(--color-primary)",
  },
} as ChartConfig;

export default function DashboardPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">대시보드</h1>
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>방문자 수</CardTitle>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={loaderData.stats}
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
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="views"
                  type="natural"
                  stroke="var(--color-views)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
