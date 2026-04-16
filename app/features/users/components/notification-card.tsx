import { EyeIcon, Link } from "lucide-react";
import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { cn } from "~/lib/utils";
import { DateTime } from "luxon";
import { useFetcher } from "react-router";

export interface NotificationCardProps {
  id: number;
  seen: boolean;
  userName: string;
  productName?: string;
  postTitle?: string;
  payloadId?: number | null;
  avatarSrc?: string;
  avatarFallback?: string;
  type: "follow" | "review" | "reply" | "mention";
  timeAgo: DateTime;
  onView?: () => void;
}

export function NotificationCard({
  id,
  seen,
  userName,
  productName,
  postTitle,
  payloadId,
  avatarSrc,
  avatarFallback,
  type,
  timeAgo,
}: NotificationCardProps) {
  const getMessage = (type: "follow" | "review" | "reply" | "mention") => {
    return {
      follow: `${userName}님이 팔로우 하였습니다`,
      review: `${userName}님이 리뷰를 작성하였습니다`,
      reply: `${userName}님이 댓글을 작성하였습니다`,
      mention: `${userName}님이 멘션을 받았습니다`,
    }[type];
  };
  const fetcher = useFetcher();
  const optimisticIsSeen = fetcher.state === "idle" ? seen : !seen;
  return (
    <Card className={cn("min-w-[450px]", optimisticIsSeen ? "" : "bg-yellow-500/20")}>
      <CardHeader className="flex flex-row items-center gap-5">
        <Avatar>
          <AvatarImage src={avatarSrc} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg font-bold">
            <span>{getMessage(type)}</span>
            <span>{productName ? ` - ${productName}` : ""}</span>
            <span>{postTitle ? ` - ${postTitle}` : ""}</span>
          </CardTitle>
          <small className="text-sm text-muted-foreground">
            {timeAgo.toRelative()}
          </small>
        </div>
      </CardHeader>
      {!optimisticIsSeen && <CardFooter className="flex justify-end">
        <fetcher.Form
          method="post"
          action={`/my/notifications/${id}/seen`}
        >
          <Button
            variant="outline"
            size="icon"
            aria-label="알림 보기"
          >
            <EyeIcon className="size-4" />
          </Button>
        </fetcher.Form>
      </CardFooter>}
    </Card>
  );
}
