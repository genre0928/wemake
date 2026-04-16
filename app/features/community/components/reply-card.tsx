import { LoaderCircleIcon, ReplyIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useFetcher, useOutletContext } from "react-router";
import InputPair from "~/common/components/input-pair";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { cn } from "~/lib/utils";
import { DateTime } from "luxon";
export interface ReplyCardProps {
  nickname: string;
  content: string;
  timeAgo: DateTime;
  avatarSrc?: string | null;
  avatarFallback?: string;
  topLevel: boolean;
  topLevelId?: number;
  replies?: {
    reply_id: number;
    content: string;
    created_at: string;
    profiles: {
      nickname: string;
      avatar: string | null;
    };
  }[];
}

export function ReplyCard({
  nickname,
  content,
  timeAgo,
  avatarSrc,
  avatarFallback = "CN",
  topLevel,
  topLevelId,
  replies,
}: ReplyCardProps) {
  const fetcher = useFetcher<{ success?: boolean }>();
  const isSubmitting = fetcher.state !== "idle";
  const [replying, setReplying] = useState(false);
  const toggleReplying = () => {
    setReplying((prev) => !prev);
  };
  const { isLoggedIn, userProfile } = useOutletContext<{
    isLoggedIn: boolean;
    userProfile: {
      avatar?: string;
      nickname?: string;
    } | null;
  }>();
  useEffect(() => {
    if (fetcher.data?.success) {
      setReplying(false);
    }
  }, [fetcher.data?.success]);
  return (
    <div className={cn("flex flex-col gap-5")}>
      <div className="flex gap-5">
        <Avatar className="size-10">
          {avatarSrc ? <AvatarImage src={avatarSrc} /> : null}
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-5 text-sm text-muted-foreground w-2/3">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-5">
              <Link to={`/users/${nickname}`}>
                <span>{nickname}</span>
              </Link>
              <span>{timeAgo.toRelative()}</span>
            </div>
            <p>{content}</p>
          </div>
          {!replying ? (
            isLoggedIn && topLevel ? (
              <div>
                <Button variant="ghost" onClick={toggleReplying}>
                  <ReplyIcon className="size-4" />
                  답글 작성
                </Button>
              </div>
            ) : null
          ) : isLoggedIn ? (
            <fetcher.Form className="flex flex-col gap-5" method="post">
              {typeof topLevelId === "number" ? (
                <input type="hidden" name="topLevelId" value={topLevelId} />
              ) : null}
              <div className="flex gap-5">
                <Avatar className="size-10">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <InputPair
                  name="comment"
                  id="comment"
                  placeholder="댓글을 입력해주세요"
                  textArea
                  defaultValue={`@${nickname} `}
                />
              </div>
              <div className="flex justify-end">
                <Button variant="default" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <LoaderCircleIcon className="animate-spin" /> : "댓글 작성"}
                </Button>
              </div>
            </fetcher.Form>
          ) : null}
          {topLevel &&
            replies &&
            replies.map((reply) => (
              <ReplyCard
                key={reply.created_at}
                nickname={reply.profiles.nickname}
                content={reply.content}
                timeAgo={DateTime.fromISO(reply.created_at)}
                topLevel={false}
                topLevelId={reply.reply_id}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
