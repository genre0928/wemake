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

const chartData = [
  { month: "January", views: 186, visitior: 780 },
  { month: "February", views: 305, visitior: 350 },
  { month: "March", views: 237, visitior: 572 },
  { month: "April", views: 73, visitior: 66 },
  { month: "May", views: 209, visitior: 81 },
  { month: "June", views: 214, visitior: 158 },
];
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

export default function DashboardProductPage() {
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
                data={chartData}
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
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel indicator="line" />}
                />
                <Area
                  dataKey="visitior"
                  type="natural"
                  strokeWidth={2}
                  dot={false}
                />
                <Area
                  dataKey="views"
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
