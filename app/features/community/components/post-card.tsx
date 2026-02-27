import { Link } from "react-router";
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

export interface PostCardProps {
  postId: string;
  title: string;
  author: string;
  category: string;
  timeAgo: string;
  avatarSrc?: string;
  avatarFallback?: string;
  expanded?: boolean;
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
}: PostCardProps) {
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
              <span>{timeAgo}</span>
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
          <Button variant="outline" className="flex flex-col size-16">
            <HeartIcon className="size-4 shrink-0" />
            <span>10</span>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
