import { ReplyIcon } from "lucide-react";
import { useState } from "react";
import { Form, Link } from "react-router";
import InputPair from "~/common/components/input-pair";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { cn } from "~/lib/utils";

export interface ReplyCardProps {
  nickname: string;
  content: string;
  timeAgo: string;
  avatarSrc?: string;
  avatarFallback?: string;
  topLevel: boolean;
}

export function ReplyCard({
  nickname,
  content,
  timeAgo,
  avatarSrc = "https://github.com/shadcn.png",
  avatarFallback = "CN",
  topLevel,
}: ReplyCardProps) {
  const [replying, setReplying] = useState(false);
  const toggleReplying = () => {
    setReplying((prev) => !prev);
  };
  return (
    <div className={cn("flex flex-col gap-5")}>
      <div className="flex gap-5">
        <Avatar className="size-10">
          <AvatarImage src={avatarSrc} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-5 text-sm text-muted-foreground w-2/3">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-5">
              <Link to={`/users/${nickname}`}>
                <span>{nickname}</span>
              </Link>
              <span>{timeAgo}</span>
            </div>
            <p>{content}</p>
          </div>
          {!replying ? (
            <div>
              <Button variant="ghost" onClick={toggleReplying}>
                <ReplyIcon className="size-4" />
                답글 작성
              </Button>
            </div>
          ) : (
            <Form className="flex flex-col gap-5">
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
                />
              </div>
              <div className="flex justify-end">
                <Button variant="default" type="submit">
                  댓글 작성
                </Button>
              </div>
            </Form>
          )}
          {topLevel && (
            <ReplyCard
              nickname="닉네임"
              content="나는 이 글의 내용에 대해 전적으로 동의해, 왜냐하면 나도 비슷한 경험이 있기 때문이야"
              timeAgo="1분 전"
              topLevel={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}
