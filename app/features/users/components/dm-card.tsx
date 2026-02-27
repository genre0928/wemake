import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { cn } from "~/lib/utils";

export interface DmCardProps {
  isSendUser: boolean;
  message: string;
  avatarSrc?: string;
  avatarFallback?: string;
}

export function DmCard({
  isSendUser,
  message,
  avatarSrc = "https://github.com/genre0928.png",
  avatarFallback = "N",
}: DmCardProps) {
  return (
    <div
      className={cn(
        "flex items-end gap-4",
        isSendUser ? "flex-row-reverse" : "",
      )}
    >
      <Avatar className="size-10">
        <AvatarImage src={avatarSrc} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "rounded-md p-4 text-sm max-w-1/4",
          isSendUser ? "bg-primary text-primary-foreground rounded-br-none rounded-bl-none" : "bg-accent rounded-bl-none rounded-br-none",
        )}
      >
        <p>{message}</p>
      </div>
    </div>
  );
}
