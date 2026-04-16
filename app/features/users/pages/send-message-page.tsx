import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId, getUserProfile } from "../queries";
import type { Route } from "./+types/send-message-page";
import { getOrCreateChatRoom } from "../mutations";
import { redirect } from "react-router";
import z from "zod";

const formSchema = z.object({
  content: z.string().min(1),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
  if (request.method !== "POST") {
    return {
      success: false,
      error: "Method not allowed",
    };
  }
  const formData = await request.formData();
  const { client } = makeSSRClient(request);
  const fromUserId = await getLoggedInUserId(client);
  const { profile_id: toUserId } = await getUserProfile(
    client,
    params.nickname,
  );
  const chatRoomId = await getOrCreateChatRoom(client, {
    fromUserId,
    toUserId,
    content: formData.get("content") as string,
  });
  return redirect(`/my/messages/${chatRoomId}`);
};
