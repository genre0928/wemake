import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { DotIcon, EyeIcon, HeartIcon, LockIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { DateTime } from "luxon";

export interface IdeaCardProps {
  ideaId: number;
  title: string;
  viewCount: number;
  timeAgo: string;
  likeCount: number;
  isLiked: boolean;
  isClaimed: boolean;
  owner?: boolean;
}

export function IdeaCard({
  ideaId,
  title,
  viewCount,
  timeAgo,
  likeCount,
  isLiked,
  isClaimed,
  owner,
}: IdeaCardProps) {
  return (
    <Card className="bg-transparent hover:bg-primary/10">
      <Link to={`/ideas/${ideaId}`} aria-disabled={isClaimed && owner}>
        <CardHeader>
          <CardTitle className="text-lg leading-tight tracking-tight line-clamp-2">
            <span
              className={cn(isClaimed && "line-through text-muted-foreground")}
            >
              {title}
            </span>
          </CardTitle>
        </CardHeader>
        {!owner && (
          <CardContent className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-sm leading-tight">
              <EyeIcon className="size-4" />
              <span>{viewCount}</span>
              <DotIcon className="size-4" />
              <span>{DateTime.fromISO(timeAgo).toRelative()}</span>
            </div>
          </CardContent>
        )}
      </Link>
      <CardFooter className="gap-2 justify-end">
        {!isClaimed ? (
          <>
            <Button variant="outline">
              <HeartIcon className={cn("size-4", isLiked && "fill-red-500")} />
              <span>{likeCount}</span>
            </Button>
            <Button asChild>
              <Link to={`/ideas/${ideaId}`}>
                <div>구매하기 &rarr;</div>
              </Link>
            </Button>
          </>
        ) : (
          <Button variant="outline" disabled>
            <LockIcon className="size-4" />
            <span>판매 완료</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
