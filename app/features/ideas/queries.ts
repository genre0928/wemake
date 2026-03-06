import client from "~/supa-client";

export const getIdeas = async ({ limit = 7 }: { limit?: number }) => {
  const { data, error } = await client
    .from("idea_list_view")
    .select("*")
    .limit(limit);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getIdea = async (ideaId: number) => {
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
