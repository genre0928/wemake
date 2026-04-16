import { makeSSRClient } from "~/supa-client";
import { NotificationCard } from "../components/notification-card";
import type { Route } from "./+types/notifications-page";
import { getLoggedInUserId, getNotifications } from "../queries";
import { DateTime } from "luxon";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const notifications = await getNotifications(client, userId);
  return { notifications };
};

export default function NotificationsPage({
  loaderData,
}: Route.ComponentProps) {
  const { notifications } = loaderData;
  return (
    <div className="space-y-20">
      <h1 className="text-4xl font-bold">알림</h1>
      <div className="flex flex-col items-start gap-5">
        {notifications.map((notification) => (
          <NotificationCard
            id={notification.notification_id as number}
            key={notification.notification_id}
            seen={notification.seen}
            userName={notification.source.name}
            productName={notification.product?.name ?? undefined}
            postTitle={notification.post?.title ?? ""}
            avatarSrc={notification.source.avatar ?? undefined}
            type={notification.type}
            payloadId={
              notification.product?.product_id ??
              notification.post?.post_id ??
              null
            }
            timeAgo={DateTime.fromISO(notification.created_at ?? "")}
          />
        ))}
      </div>
    </div>
  );
}
