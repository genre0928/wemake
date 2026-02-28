import { HomeIcon, PackageIcon, SparkleIcon } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router";
import { Separator } from "~/common/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "~/common/components/ui/sidebar";

export default function DashboardLayout() {
  const location = useLocation();
  return (
    <SidebarProvider className="h-full min-h-0 overflow-hidden">
      <Sidebar variant="floating" className="pt-16">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/my/dashboard"}
                >
                  <Link to="/my/dashboard">
                    <HomeIcon className="size-4" />
                    <span>홈</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === "/my/dashboard/ideas"}
              >
                <Link to="/my/dashboard/ideas">
                  <SparkleIcon className="size-4" />
                  <span>아이디어</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroup>
          <Separator />
          <SidebarGroup>
            <SidebarGroupLabel>제품 분석</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <PackageIcon className="size-4" />
                  <span>생산성 향상 도구</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="w-full h-full overflow-y-scroll no-scrollbar">
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
