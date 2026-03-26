import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const createReview = async (
  client: SupabaseClient<Database>,
  {
    product_id,
    profile_id,
    rating,
    review,
  }: { product_id: number; profile_id: string; rating: number; review: string },
) => {
  const { data, error } = await client.from("reviews").insert({
    product_id,
    profile_id,
    rating,
    review,
  });
  if (error) {
    throw error;
  }
};
