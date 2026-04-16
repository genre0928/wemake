import { type Database } from "~/supa-client";
import type { SupabaseClient } from "@supabase/supabase-js";

export const getIdeas = async (client: SupabaseClient<Database>, { limit = 7 }: { limit?: number }) => {
  const { data, error } = await client
    .from("idea_list_view")
    .select("*")
    .limit(limit);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getIdea = async (client: SupabaseClient<Database>, ideaId: number) => {
  const { data, error } = await client
    .from("idea_list_view")
    .select("*")
    .eq("idea_id", ideaId)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getMyClaimedIdeas = async (client: SupabaseClient<Database>, { userId, limit = 7 }: { userId: string, limit?: number }) => {
  const { data, error } = await client
    .from("ideas")
    .select("*")
    .eq("claimed_by", userId)
    .limit(limit);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};