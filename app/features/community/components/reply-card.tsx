import { ReplyIcon } from "lucide-react";
import { Link } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";

export interface ReplyCardProps {
  nickname: string;
  content: string;
  timeAgo: string;
  avatarSrc?: string;
  avatarFallback?: string;
}

export function ReplyCard({
  nickname,
  content,
  timeAgo,
  avatarSrc = "https://github.com/shadcn.png",
  avatarFallback = "CN",
}: ReplyCardProps) {
  return (
    <div className="flex flex-col gap-5 w-2/3">
      <div className="flex gap-5">
        <Avatar className="size-10">
          <AvatarImage src={avatarSrc} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-5 text-sm text-muted-foreground w-full">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-5">
              <Link to={`/users/${nickname}`}>
                <span>{nickname}</span>
              </Link>
              <span>{timeAgo}</span>
            </div>
            <p>{content}</p>
          </div>
          <div>
            <Button variant="ghost">
              <ReplyIcon className="size-4" />
              답글 작성
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
