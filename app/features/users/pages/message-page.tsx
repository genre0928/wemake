import { Badge, SendIcon } from "lucide-react";
import { Form, useOutletContext } from "react-router";
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
import {
  getLoggedInUserId,
  getMessagesByMessageRoomId,
  getRoomParticipant,
  sendMessageToRoom,
} from "../queries";
import { browserClient, makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/message-page";
import { useEffect, useRef, useState } from "react";
import type { Database } from "database.types";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const messages = await getMessagesByMessageRoomId(client, {
    messageRoomId: Number(params.messageRoomId),
    userId,
  });
  const participant = await getRoomParticipant(client, {
    messageRoomId: Number(params.messageRoomId),
    userId,
  });
  return { messages, participant };
};

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const content = formData.get("content");
  if (!content) {
    return { error: "Content is required" };
  }
  await sendMessageToRoom(client, {
    messageRoomId: Number(params.messageRoomId),
    userId,
    content: content as string,
  });
  return {
    success: true,
  };
};

export default function MessagePage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const [messages, setMessages] = useState(loaderData.messages);
  const { userId, name, avatar } = useOutletContext<{ userId: string, name: string, avatar: string }>();
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (actionData?.success) {
      formRef.current?.reset();
    }
  }, [actionData?.success]);
  useEffect(() => {
    const changes = browserClient
      .channel(`room:${userId}-${loaderData.participant.profile.profile_id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          setMessages((prev) => [
            ...prev,
            payload.new as Database["public"]["Tables"]["messages"]["Row"],
          ]);
        },
      )
      .subscribe();
    return () => {
      changes.unsubscribe();
    };
  }, []);
  const isOnline = true;
  return (
    <div className="h-full flex flex-col justify-between">
      {/* DM 발송 유저 정보 섹션 */}
      <Card>
        <CardHeader className="flex items-center gap-3">
          <Avatar className="size-14">
            <AvatarImage
              src={loaderData.participant.profile.avatar ?? undefined}
            />
            <AvatarFallback>
              {loaderData.participant.profile.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <CardTitle>{loaderData.participant.profile.name}</CardTitle>
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
      <div className="py-10 px-4 flex flex-col justify-start overflow-y-scroll h-full no-scrollbar space-y-4">
        {messages.map((message) => (
          <DmCard
            key={message.message_id}
            isFromMe={message.sender_id === userId}
            message={message.content}
            avatarSrc={
              message.sender_id === userId
                ? (avatar ?? "")
                : ""
            }
            avatarFallback={
              message.sender_id === userId
                ? loaderData.participant.profile.name.charAt(0)
                : (name?.charAt(0) ?? "")
            }
          />
        ))}
      </div>
      {/* DM 발송 섹션 */}
      <Card>
        <CardHeader>
          <Form
            className="relative flex items-center justify-end"
            method="post"
            ref={formRef}
          >
            <Textarea
              placeholder="메시지를 입력해주세요"
              required
              name="content"
            />
            <Button type="submit" className="absolute right-3">
              <SendIcon className="size-4" />
            </Button>
          </Form>
        </CardHeader>
      </Card>
    </div>
  );
}

export const shouldRevalidate = () => false;
