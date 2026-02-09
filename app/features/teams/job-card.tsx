import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { Badge } from "~/common/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { SquareArrowOutUpRight } from "lucide-react";

export interface TeamCardProps {
  teamId: string;
  title: string;
  description: string;
  tags: string[];
  authorNickname: string;
  authorAvatarUrl?: string;
  authorAvatarFallback?: string;
}

export function TeamCard({
  teamId,
  title,
  description,
  tags,
  authorNickname,
  authorAvatarUrl = "https://github.com/shadcn.png",
  authorAvatarFallback = "N",
}: TeamCardProps) {
  return (
    <Card className="bg-transparent hover:bg-primary/10 transition-colors duration-200 ease-in-out">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="line-clamp-1 text-xl flex items-center justify-between">
          <span>{title}</span>
        </CardTitle>
        <Link
          to={`/teams/${teamId}`}
          className="group inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <SquareArrowOutUpRight className="size-6 icon-float-on-group-hover" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="ghost"
              className="flex items-center gap-2 text-base"
            >
              <span>{tag}</span>
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <div>
          <Badge
            variant="ghost"
            className="flex items-center gap-2 text-base"
          >
            <span>@{authorNickname}</span>
            <Avatar className="size-4">
              <AvatarImage src={authorAvatarUrl} />
              <AvatarFallback>{authorAvatarFallback}</AvatarFallback>
            </Avatar>
          </Badge>
        </div>
      </CardFooter>
    </Card>
  );
}
