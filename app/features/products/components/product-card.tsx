import { Link } from "react-router";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { EyeIcon, HeartIcon, MessageCircleIcon } from "lucide-react";
import { cn } from "~/lib/utils";

export interface ProductCardProps {
  productId: string;
  name: string;
  description: string;
  commentCount?: number;
  viewCount?: number;
  likeCount?: number;
  isLiked: boolean;
}

export function ProductCard({
  productId,
  name,
  description,
  commentCount = 10,
  viewCount = 10,
  likeCount = 10,
  isLiked,
}: ProductCardProps) {
  return (
    <Card className="bg-transparent hover:bg-primary/10">
      <div className="flex justify-between">
        <Link to={`/products/${productId}`} className="flex-1">
          {/* 카드 헤더 섹션 */}
          <CardHeader>
            <CardTitle className="text-2xl font-semibold leading-none tracking-tight line-clamp-1">
              {name}
            </CardTitle>
            <CardDescription className="text-muted-foreground line-clamp-2">
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
        </Link>
        {/* 카드 푸터 섹션 */}
        <CardFooter className="shrink-0">
          <Button
            variant="outline"
            className="flex flex-col size-16 cursor-pointer"
          >
            <HeartIcon
              className={cn("size-4", isLiked && "fill-primary text-primary")}
            />
            <span>{likeCount}</span>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
