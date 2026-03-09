import db from "~/index";
import client from "~/supa-client";

export const getTeams = async ({ limit = 7 }: { limit: number }) => {
  const { data, error } = await client
    .from("teams")
    .select(
      `
        team_id,
        name,
        position,
        description,
        team_leader:profiles!team_leader_id(
          name,
          avatar
        )
      `,
    )
    .limit(limit);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
