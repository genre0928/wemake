import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const getTeams = async (client: SupabaseClient<Database>, { limit = 7 }: { limit: number }) => {
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

export const getTeamById = async (client: SupabaseClient<Database>, teamId: number) => {
  const { data, error } = await client
    .from("teams")
    .select(`
      *,
      team_leader:profiles!team_leader_id(
        name,
        avatar,
        nickname
      )
    `)
    .eq("team_id", teamId)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};