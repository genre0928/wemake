import { Outlet } from "react-router";
import { z } from "zod";
import type { Route } from "./+types/leaderboard-layout";

const searchParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { success, data } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams),
  );
  if (!success) {
    throw new Error("Invalid parameters");
  }
};

export default function LeaderboardLayout() {
  return <Outlet />;
}
