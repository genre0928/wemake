import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";
import { productListSelect } from "../products/queries";
import { date } from "zod";
import { redirect } from "react-router";

export const getUserProfile = async (
  client: SupabaseClient<Database>,
  nickname: string,
) => {
  const { data, error } = await client
    .from("profiles")
    .select(
      `
        profile_id,
        avatar,
        name,
        nickname,
        position
        `,
    )
    .eq("nickname", nickname)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getUserById = async (
  client: SupabaseClient<Database>,
  { id }: { id: string },
) => {
  const { data, error } = await client
    .from("profiles")
    .select(
      `
        profile_id,
        avatar,
        name,
        nickname,
        email
        `,
    )
    .eq("profile_id", id)
    .maybeSingle();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getUserProducts = async (
  client: SupabaseClient<Database>,
  nickname: string,
) => {
  const { data: profile } = await client
    .from("profiles")
    .select("profile_id")
    .eq("nickname", nickname)
    .single();

  if (!profile) {
    return [];
  }

  const { data, error } = await client
    .from("products")
    .select(productListSelect)
    .eq("profile_id", profile.profile_id);

  if (error) {
    throw new Error(error.message);
  }
  return data ?? [];
};

export const getUserPosts = async (
  client: SupabaseClient<Database>,
  nickname: string,
) => {
  const { data, error } = await client
    .from("community_post_list_view")
    .select("*")
    .eq("nickname", nickname);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getLoggedInUserId = async (client: SupabaseClient<Database>) => {
  const { data, error } = await client.auth.getUser();
  if (error || data?.user === null) {
    throw redirect("/auth/login");
  }
  return data.user.id;
};
