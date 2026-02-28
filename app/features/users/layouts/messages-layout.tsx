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
    // SidebarProvider 컴포넌트가 flex wrapper 역할을 해주고 있다고 생각해야함
    <SidebarProvider className="overflow-hidden max-h-[calc(100vh-14rem)] h-[calc(100vh-14rem)] min-h-full">
      {/* 사이드바 섹션 */}
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
      {/* Outlet 섹션 */}
      <div className="h-full flex-1">
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
