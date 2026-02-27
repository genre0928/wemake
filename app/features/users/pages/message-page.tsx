import { Badge, SendIcon } from "lucide-react";
import { Form } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { Textarea } from "~/common/components/ui/textarea";
import { cn } from "~/lib/utils";
import { DmCard } from "../components/dm-card";

export default function MessagePage() {
  const isOnline = true;
  return (
    <div className="h-full flex flex-col justify-between">
      {/* DM 발송 유저 정보 섹션 */}
      <Card>
        <CardHeader className="flex items-center gap-3">
          <Avatar className="size-14">
            <AvatarImage src="https://github.com/genre0928.png" />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <CardTitle>닉네임</CardTitle>
              <Badge
                className={cn(
                  "size-2 border-none rounded-full",
                  isOnline ? "bg-green-500" : "bg-red-500",
                )}
              ></Badge>
            </div>
            <CardDescription>2일 전</CardDescription>
          </div>
        </CardHeader>
      </Card>
      {/* 메시지 로그 섹션 */}
      <div className="py-10 px-4 flex flex-col justify-start overflow-y-scroll h-full no-scrollbar">
        {Array.from({ length: 1 }).map((__, index) => (
          <DmCard
            key={index}
            isSendUser={index % 2 === 0}
            message="메시지 더미데이터입니다. 내용을 길게 해보겟읍니다ddddddddddd"
            avatarSrc="https://github.com/genre0928.png"
            avatarFallback="N"
          />
        ))}
      </div>
      {/* DM 발송 섹션 */}
      <Card>
        <CardHeader>
          <Form className="relative flex items-center justify-end">
            <Textarea placeholder="메시지를 입력해주세요" />
            <Button type="submit" className="absolute right-3">
              <SendIcon className="size-4" />
            </Button>
          </Form>
        </CardHeader>
      </Card>
    </div>
  );
}
