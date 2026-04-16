import { Outlet, useOutletContext } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarProvider,
} from "~/common/components/ui/sidebar";
import { MessageCard } from "../components/message-card";
import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/messages-layout";
import { getLoggedInUserId, getMessages } from "../queries";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const messages = await getMessages(client, userId);
  return { messages };
};

export default function MessagesLayout({ loaderData }: Route.ComponentProps) {
  const { userId, name, avatar } = useOutletContext<{
    userId: string;
    name: string;
    avatar: string;
  }>();
  console.log(loaderData)
  return (
    // SidebarProvider 컴포넌트가 flex wrapper 역할을 해주고 있다고 생각해야함
    <SidebarProvider className="overflow-hidden max-h-[calc(100vh-14rem)] h-[calc(100vh-14rem)] min-h-full">
      {/* 사이드바 섹션 */}
      <Sidebar variant="floating" className="pt-16">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu className="space-y-1">
              {loaderData.messages.map((message) => (
                <MessageCard
                  id={message.message_room_id}
                  key={message.message_room_id}
                  name={message.name}
                  lastMessage={message.last_message}
                  avatarSrc={message.avatar}
                  avatarFallback={message.name.charAt(0)}
                />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      {/* Outlet 섹션 */}
      <div className="h-full flex-1">
        <Outlet context={{ userId, name, avatar }} />
      </div>
    </SidebarProvider>
  );
}
