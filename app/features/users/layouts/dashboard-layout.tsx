import { Earth, HomeIcon, PackageIcon, SparkleIcon } from "lucide-react";
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
import type { Route } from "./+types/dashboard-layout";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId, getUserProductsByUserId } from "../queries";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const products = await getUserProductsByUserId(client, userId);
  return { products };
};

export default function DashboardLayout({ loaderData }: Route.ComponentProps) {
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
              {loaderData.products.map((product) => (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      location.pathname ===
                      `/my/dashboard/products/${product.product_id}`
                    }
                  >
                    <Link to={`/my/dashboard/products/${product.product_id}`}>
                      <Earth className="size-4" />
                      <span>{product.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
