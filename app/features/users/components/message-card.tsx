import { Link, useLocation } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/common/components/ui/sidebar";
import { cn } from "~/lib/utils";

export interface MessageCardProps {
  id: number;
  key: string;
  name: string;
  lastMessage: string;
  avatarSrc?: string;
  avatarFallback?: string;
}

export function MessageCard({
  id,
  key,
  name,
  lastMessage,
  avatarSrc = "https://github.com/genre0928.png",
  avatarFallback = "N",
}: MessageCardProps) {
  const location = useLocation();
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        key={key}
        className="h-14"
        asChild
        isActive={location.pathname === `/my/messages/${id}`}
      >
        <Link to={`/my/messages/${id}`}>
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src={avatarSrc} />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{name}</span>
              <span className="text-xs text-muted-foreground line-clamp-1">
                {lastMessage}
              </span>
            </div>
          </div>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
