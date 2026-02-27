import { NotificationCard } from "../components/notification-card";

export default function NotificationsPage() {

  return (
    <div className="space-y-20">
      <h1 className="text-4xl font-bold">알림</h1>
      <div className="flex flex-col items-start gap-5">
        <NotificationCard
          seen={false}
          title="닉네임님이 팔로우 하였습니다"
          timeAgo="1분 전"
          avatarFallback="CN"
        />
      </div>
    </div>
  );
}
