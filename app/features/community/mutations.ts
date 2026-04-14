import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const createPost = async (
  client: SupabaseClient<Database>,
  {
    title,
    content,
    category,
    userId,
  }: { title: string; content: string; category: string; userId: string },
) => {
  const { data: categoryData, error: categoryError } = await client
    .from("topics")
    .select("topic_id")
    .eq("slug", category)
    .single();

  if (categoryError) {
    throw categoryError;
  }
  const { data, error } = await client
    .from("posts")
    .insert({
      title,
      content,
      profile_id: userId,
      topic_id: categoryData.topic_id,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
};

export const createReply = async (
  client: SupabaseClient<Database>,
  {
    comment,
    userId,
    postId,
    topLevelId,
  }: { comment: string; userId: string; postId: number; topLevelId?: number },
) => {
  const { error } = await client.from("post_replies").insert({
    ...(topLevelId ? { parent_reply_id: topLevelId } : { post_id: postId }),
    content: comment,
    profile_id: userId,
  });
  if (error) {
    throw error;
  }
};

export const toggleUpvote = async (
  client: SupabaseClient<Database>,
  { userId, postId }: { userId: string; postId: number },
) => {
  const { count, error } = await client
    .from("post_likes")
    .select("*", { count: "exact", head: true })
    .eq("post_id", postId)
    .eq("profile_id", userId);

  if (error) {
    throw error;
  }

  if (count === 0) {
    await client.from("post_likes").insert({
      profile_id: userId,
      post_id: postId,
    });
  } else {
    await client
      .from("post_likes")
      .delete()
      .eq("post_id", postId)
      .eq("profile_id", userId);
  }
};
