import { Link, useFetcher } from "react-router";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { DotIcon, HeartIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { DateTime } from "luxon";

export interface PostCardProps {
  postId: number;
  title: string;
  author: string;
  category: string;
  timeAgo: DateTime;
  avatarSrc?: string;
  avatarFallback?: string;
  expanded?: boolean;
  upvotes: number;
  isUpvoted: boolean;
}

export function PostCard({
  postId,
  title,
  author,
  category,
  timeAgo,
  avatarSrc = "https://github.com/shadcn.png",
  avatarFallback = "N",
  expanded = false,
  upvotes,
  isUpvoted,
}: PostCardProps) {
  const fetcher = useFetcher();
  const optimisticVotesCount = fetcher.state === "idle" ? upvotes : isUpvoted ? upvotes - 1 : upvotes + 1;
  const optimisticIsUpvoted = fetcher.state === "idle" ? isUpvoted : !isUpvoted;
  const upvoteHandler = async () => {
    await fetcher.submit(null, {
      method: "post",
      action: `/community/${postId}/upvote`,
    });
  };
  return (
    <Card
      className={cn(
        "bg-transparent hover:bg-primary/10",
        expanded && "flex flex-row items-center justify-between",
      )}
    >
      <Link
        to={`/community/${postId}`}
        className={cn(expanded && "flex-1 min-w-0")}
      >
        <CardHeader
          className={cn("gap-5", "flex flex-row items-center flex-1 min-w-0")}
        >
          <Avatar className="size-14">
            <AvatarFallback>{avatarFallback}</AvatarFallback>
            <AvatarImage src={avatarSrc} />
          </Avatar>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
              {title}
            </CardTitle>
            <div className="flex gap-1 text-sm leading-tight text-muted-foreground">
              <span>{author}</span>
              <span>{category}</span>
              <DotIcon className="size-4" />
              <span>{timeAgo.toRelative()}</span>
            </div>
          </div>
        </CardHeader>
      </Link>
      {!expanded && (
        <CardFooter className="flex justify-end">
          <Button variant="link" asChild>
            <Link to={`/community/${postId}`}>댓글 →</Link>
          </Button>
        </CardFooter>
      )}
      {expanded && (
        <CardFooter>
          <Button
            variant="outline"
            className={cn(
              "flex flex-col size-16 cursor-pointer ",
              optimisticIsUpvoted && "border-primary dark:border-primary",
            )}
            onClick={upvoteHandler}
          >
            <HeartIcon
              className={cn(
                "size-4 shrink-0",
                optimisticIsUpvoted && "fill-primary text-primary",
              )}
            />
            <span>{optimisticVotesCount}</span>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
