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

export const createProduct = async (
  client: SupabaseClient<Database>,
  {
    name,
    tags,
    url,
    description,
    category_id,
    imageUrl,
    userId,
  }: {
    name: string;
    tags: string[];
    url: string;
    description: string;
    category_id: number;
    imageUrl: string;
    userId: string;
  },
) => {
  const { data, error } = await client
    .from("products")
    .insert({
      name,
      tags,
      url,
      description,
      category_id,
      icon: imageUrl,
      profile_id: userId,
    })
    .select("product_id")
    .single();
  if (error) {
    throw error;
  }
  return data.product_id;
};
