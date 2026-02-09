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

export interface IdeaCardProps {
  ideaId: string;
  title: string;
  viewCount: number;
  timeAgo: string;
  likeCount: number;
  isLiked?: boolean;
  isClaimed?: boolean;
}

export function IdeaCard({
  ideaId,
  title,
  viewCount,
  timeAgo,
  likeCount,
  isLiked = false,
  isClaimed = false,
}: IdeaCardProps) {
  return (
    <Card className="bg-transparent hover:bg-primary/10 transition-colors duration-200 ease-in-out">
      <CardHeader>
        <Link to={`/ideas/${ideaId}`}>
          <CardTitle className="text-lg leading-tight tracking-tight line-clamp-2">
            <span
              className={cn(!isClaimed && "line-through text-muted-foreground")}
            >
              {title}
            </span>
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-sm leading-tight">
          <EyeIcon className="size-4" />
          <span>{viewCount}</span>
          <DotIcon className="size-4" />
          <span>{timeAgo}</span>
        </div>
      </CardContent>
      <CardFooter className="gap-2 justify-end">
        <Button variant="outline">
          <HeartIcon className="size-4" />
          <span>{likeCount}</span>
        </Button>
        {isClaimed ? (
          <Button asChild>
            <div>구매하기 &rarr;</div>
          </Button>
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
