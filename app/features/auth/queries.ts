import { makeSSRClient } from "~/supa-client";

export const checkUsernameExists = async (
  request: Request,
  { nickname }: { nickname: string },
) => {
  const { client } = makeSSRClient(request);
  const { count, error } = await client
    .from("profiles")
    .select("profile_id", { count: "exact", head: true })
    .eq("nickname", nickname);
  if (error) {
    return false;
  }
  return (count ?? 0) > 0;
};
