import type { SupabaseClient } from "@supabase/supabase-js";

export const claimIdea = async (
  client: SupabaseClient,
  { ideaId, userId }: { ideaId: number; userId: string },
) => {
  const { data, error } = await client
    .from("ideas")
    .update({
      claimed_at: new Date().toISOString(),
      claimed_by: userId,
    })
    .eq("idea_id", ideaId);
  return { data, error };
};
