import { PencilIcon, StarIcon, TrashIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { DateTime } from "luxon";

export interface ReviewCardProps {
  avatarSrc: string;
  displayName: string;
  username: string;
  rating?: number;
  content: string;
  dateText: DateTime;
  /** 본인 리뷰일 때만 수정/삭제 버튼 표시 */
  showActions?: boolean;
}

export function ReviewCard({
  avatarSrc,
  displayName,
  username,
  rating = 5,
  content,
  dateText,
  showActions = false,
}: ReviewCardProps) {
  return (
    <div className="space-y-5">
      {/* 아바타 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={avatarSrc} />
            <AvatarFallback>{displayName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <span>{displayName}</span>
            <p className="text-sm text-muted-foreground">@{username}</p>
          </div>
        </div>
        {showActions && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="hover:bg-primary/10"
              asChild
            >
              <div className="flex items-center gap-2">
                <PencilIcon className="size-4" />
              </div>
            </Button>
            <Button
              variant="outline"
              className="hover:bg-primary/10"
              asChild
            >
              <div className="flex items-center gap-2">
                <TrashIcon className="size-4" />
              </div>
            </Button>
          </div>
        )}
      </div>
      {/* 별점 */}
      <div className="flex items-center gap-1 text-yellow-400">
        {Array.from({ length: 5 }).map((_, index) => (
          <StarIcon
            key={index}
            className="size-4"
            fill={index < rating ? "currentColor" : "none"}
          />
        ))}
      </div>
      {/* 리뷰 내용 */}
      <p className="text-sm">{content}</p>
      {/* 작성일 */}
      <p className="text-sm text-muted-foreground">{dateText.toRelative()}</p>
    </div>
  );
}
