import { EyeIcon } from "lucide-react";
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

export interface NotificationCardProps {
  seen: boolean;
  avatarSrc?: string;
  avatarFallback?: string;
  title: string;
  timeAgo: string;
  onView?: () => void;
}

export function NotificationCard({
  seen,
  avatarSrc = "https://github.com/shadcn.png",
  avatarFallback = "N",
  title,
  timeAgo,
}: NotificationCardProps) {
  const [isSeen, setIsSeen] = useState(seen);
  const onView = () => {
    setIsSeen((prev) => !prev);
  };
  return (
    <Card className={cn("min-w-[450px]", isSeen ? "" : "bg-yellow-500/20")}>
      <CardHeader className="flex flex-row items-center gap-5">
        <Avatar>
          <AvatarImage src={avatarSrc} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
          <small className="text-sm text-muted-foreground">{timeAgo}</small>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onView}
          aria-label="알림 보기"
        >
          <EyeIcon className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
