import { Outlet } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarProvider,
} from "~/common/components/ui/sidebar";
import { MessageCard } from "../components/message-card";

export default function MessagesLayout() {
  return (
    <SidebarProvider className="max-h-[calc(100vh-14rem)] overflow-hidden h-[calc(100vh-14rem)] min-h-full">
      <Sidebar variant="floating" className="pt-16">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu className="space-y-1">
              {Array.from({ length: 10 }, (_, index) => (
                <MessageCard
                  id={index + 1}
                  key={`message-card-${index + 1}`}
                  name={`닉네임 ${index + 1}`}
                  lastMessage={`마지막 대화내용입니다 아주아주 길어요`}
                  avatarSrc={`https://github.com/genre0928.png`}
                />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="w-full h-full">
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
