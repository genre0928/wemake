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
        email,
        position
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

export const getUserProductsByUserId = async (
  client: SupabaseClient<Database>,
  userId: string,
) => {
  const { data, error } = await client
    .from("products")
    .select("product_id, name")
    .eq("profile_id", userId);

  if (error) {
    throw new Error(error.message);
  }
  return data ?? [];
};

export const getNotifications = async (
  client: SupabaseClient<Database>,
  userId: string,
) => {
  const { data, error } = await client
    .from("notifications")
    .select(
      `
      notification_id,
      type,
      source:profiles!source_id(
      profile_id,
      name,
      avatar
      ),
      product:products!product_id(
      product_id,
      name
      ),
      post:posts!post_id(
      post_id,
      title
      ),
      seen,
      created_at
      `,
    )
    .eq("target_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data ?? [];
};

export const countNotifications = async (
  client: SupabaseClient<Database>,
  userId: string,
) => {
  const { count, error } = await client
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("target_id", userId)
    .eq("seen", false);

  if (error) {
    throw new Error(error.message);
  }
  return count ?? 0;
};

export const getMessages = async (
  client: SupabaseClient<Database>,
  userId: string,
) => {
  const { data, error } = await client
    .from("messages_view")
    .select("*")
    .eq("profile_id", userId)
    .neq("other_profile_id", userId);

  if (error) {
    throw new Error(error.message);
  }
  return data ?? [];
};

export const getMessagesByMessageRoomId = async (
  client: SupabaseClient<Database>,
  { messageRoomId, userId }: { messageRoomId: number; userId: string },
) => {
  const { count, error: countError } = await client
    .from("message_room_members")
    .select("*", { count: "exact", head: true })
    .eq("message_room_id", messageRoomId)
    .eq("profile_id", userId);
  if (countError) {
    throw new Error(countError.message);
  }
  if (count === 0) {
    throw new Error("채팅방에 참여하지 않은 사용자입니다.");
  }

  const { data, error } = await client
    .from("messages")
    .select(
      `
      *
      `,
    )
    .eq("message_room_id", messageRoomId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }
  return data ?? [];
};

export const getRoomParticipant = async (
  client: SupabaseClient<Database>,
  { messageRoomId, userId }: { messageRoomId: number; userId: string },
) => {
  const { count, error: countError } = await client
    .from("message_room_members")
    .select("*", { count: "exact", head: true })
    .eq("message_room_id", messageRoomId)
    .eq("profile_id", userId);
  if (countError) {
    throw new Error(countError.message);
  }
  if (count === 0) {
    throw new Error("채팅방에 참여하지 않은 사용자입니다.");
  }
  const { data, error } = await client
    .from("message_room_members")
    .select(
      `
      profile:profiles!profile_id!inner(
      name,
      avatar,
      profile_id)
      `,
    )
    .eq("message_room_id", messageRoomId)
    .neq("profile_id", userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data ?? [];
};

export const sendMessageToRoom = async (
  client: SupabaseClient<Database>,
  {
    messageRoomId,
    userId,
    content,
  }: { messageRoomId: number; userId: string; content: string },
) => {
  const { count, error: countError } = await client
    .from("message_room_members")
    .select("*", { count: "exact", head: true })
    .eq("message_room_id", messageRoomId)
    .eq("profile_id", userId);
  if (countError) {
    throw new Error(countError.message);
  }
  if (count === 0) {
    throw new Error("채팅방에 참여하지 않은 사용자입니다.");
  }
  const { error } = await client.from("messages").insert({
    message_room_id: messageRoomId,
    sender_id: userId,
    content,
  });
  if (error) {
    throw new Error(error.message);
  }
};
