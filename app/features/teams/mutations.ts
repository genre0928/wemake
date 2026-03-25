import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "database.types";
import type z from "zod";
import type { formSchema } from "./pages/create-team-page";

export const createTeam = async (
  client: SupabaseClient<Database>,
  teamData: z.infer<typeof formSchema>,
  userId: string,
) => {
  const { data, error } = await client
    .from("teams")
    .insert({
      team_leader_id: userId,
      name: teamData.name,
      team_stage: teamData.status as Database["public"]["Enums"]["team_stage"],
      size: teamData.size,
      position: teamData.position,
      description: teamData.introduction,
    })
    .select("team_id")
    .single();
  if (error) {
    throw error;
  }
  return data;
};
