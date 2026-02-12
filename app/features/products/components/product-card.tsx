import { Link } from "react-router";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import {
  EyeIcon,
  HeartIcon,
  MessageCircleIcon,
} from "lucide-react";

export interface ProductCardProps {
  productId: string;
  name: string;
  description: string;
  commentCount?: number;
  viewCount?: number;
  likeCount?: number;
  isLiked?: boolean;
}

export function ProductCard({
  productId,
  name,
  description,
  commentCount = 10,
  viewCount = 10,
  likeCount = 10,
  isLiked = false,
}: ProductCardProps) {
  return (
    <Link to={`/product/${productId}`} className="block">
      <Card className="w-full bg-transparent hover:bg-primary/10 flex flex-row transition-colors duration-200 ease-in-out">
        <CardHeader className="flex-1">
          <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
            {name}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {description}
          </CardDescription>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1">
              <MessageCircleIcon className="size-4" />
              <span className="text-sm font-medium text-muted-foreground">
                {commentCount}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <EyeIcon className="size-4" />
              <span className="text-sm font-medium text-muted-foreground">
                {viewCount}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardFooter>
          <Button variant="outline" className="flex flex-col h-16 w-16">
            {isLiked ? (
              <HeartIcon className="size-4 shrink-0 fill-red-500 stroke-red-500" />
            ) : (
              <HeartIcon className="size-4 shrink-0" />
            )}
            <span>{likeCount}</span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
