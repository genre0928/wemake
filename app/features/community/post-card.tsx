import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";

export interface PostCardProps {
  postId: string;
  title: string;
  author: string;
  category: string;
  timeAgo: string;
  avatarSrc?: string;
  avatarFallback?: string;
}

export function PostCard({
  postId,
  title,
  author,
  category,
  timeAgo,
  avatarSrc = "https://github.com/shadcn.png",
  avatarFallback = "N",
}: PostCardProps) {
  return (
    <Link to={`/community/${postId}`}>
      <Card className="bg-transparent hover:bg-primary/10 transition-colors duration-200 ease-in-out">
        <CardHeader className="flex flex-row items-center gap-2">
          <Avatar className="size-14">
            <AvatarFallback>{avatarFallback}</AvatarFallback>
            <AvatarImage src={avatarSrc} />
          </Avatar>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
              {title}
            </CardTitle>
            <div className="flex gap-2 text-sm leading-tight text-muted-foreground">
              <span>{author}</span>
              <span>{category}</span>
              <span>.</span>
              <span>{timeAgo}</span>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="flex justify-end">
          <Button variant="link" asChild>
            <Link to={`/community/${postId}`}>댓글 →</Link>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
