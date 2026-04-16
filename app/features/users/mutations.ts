import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const updateUser = async (
  client: SupabaseClient<Database>,
  {
    id,
    nickname,
    position,
  }: {
    id: string;
    nickname: string;
    position:
      | "frontend"
      | "backend"
      | "designer"
      | "marketer"
      | "planner"
      | "etc";
  },
) => {
  const { data, error } = await client
    .from("profiles")
    .update({ nickname, position })
    .eq("profile_id", id);

  if (error) {
    throw error;
  }
};

export const updateUserAvatar = async (
  client: SupabaseClient<Database>,
  {
    id,
    avatarUrl,
  }: {
    id: string;
    avatarUrl: string;
  },
) => {
  const { data, error } = await client
    .from("profiles")
    .update({ avatar: avatarUrl })
    .eq("profile_id", id);

  if (error) {
    throw error;
  }
};

export const seenNotification = async (
    client : SupabaseClient<Database>,
    { userId, notificationId }: { userId: string, notificationId: number },
) => {
    const { data, error } = await client
    .from("notifications")
    .update({ seen: true })
    .eq("notification_id", notificationId)
    .eq("target_id", userId);
    
    if (error) {
        throw error;
    }
}

export const getOrCreateChatRoom = async (
    client: SupabaseClient<Database>,
    { fromUserId, toUserId, content }: { fromUserId: string, toUserId: string, content: string },
) => {
    const { data, error } = await client
    .rpc("get_room", { from_user_id: fromUserId, to_user_id: toUserId })
    .maybeSingle();
    
    if (error) {
        throw error;
    }
    if(data?.message_room_id) {
        await client.from("messages").insert({
            message_room_id : data.message_room_id,
            sender_id : fromUserId,
            content,
        })
        return data.message_room_id;
    } else {
        const {data : chatRoomData, error : chatRoomError} = await client
        .from("message_rooms")
        .insert({})
        .select("message_room_id")
        .single();

        if(chatRoomError) {
            throw chatRoomError;
        }
        await client.from("message_room_members").insert([{
            message_room_id : chatRoomData.message_room_id,
            profile_id : fromUserId,
        }, {
            message_room_id : chatRoomData.message_room_id,
            profile_id : toUserId,
        }]);
        await client.from("messages").insert({
            message_room_id : chatRoomData.message_room_id,
            sender_id : fromUserId,
            content,
        })
        return chatRoomData.message_room_id;
    }
};