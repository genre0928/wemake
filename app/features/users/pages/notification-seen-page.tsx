import { getLoggedInUserId } from "../queries";
import { makeSSRClient } from "~/supa-client";
import { seenNotification } from "../mutations";
import type { Route } from "./+types/notification-seen-page";

export const action = async ({ request, params }: Route.ActionArgs) => {
  if (request.method !== "POST") {
    return {
      success: false,
      error: "Method not allowed",
    };
  }
  const { notificationId } = params;
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  await seenNotification(client, {
    userId,
    notificationId: Number(notificationId),
  });
  return {
    success: true,
  };
};
