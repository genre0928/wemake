import { Link } from "react-router";
import { Separator } from "./ui/separator";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  BarChart,
  BarChart3Icon,
  BellIcon,
  LogOutIcon,
  MessageCircleIcon,
  MessageCircleMore,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

const menus = [
  {
    name: "제품",
    to: "/products",
    items: [
      {
        name: "리더보드",
        description:
          "모든 제품을 확인할 수 있는 리더보드 페이지입니다. 현재 인기 제품을 확인해보세요.",
        to: "/products/leaderboard",
      },
      {
        name: "카테고리",
        description: "카테고리 페이지",
        to: "/products/category",
      },
      {
        name: "검색",
        description: "검색 페이지",
        to: "/products/search",
      },
      {
        name: "제출",
        description: "제출 페이지",
        to: "/products/submit",
      },
      {
        name: "제품 홍보",
        description: "제품 홍보 페이지",
        to: "/products/promotion",
      },
    ],
  },
  {
    name: "직업",
    to: "/jobs",
    items: [
      {
        name: "원격근무",
        description: "원격근무 페이지",
        to: "/jobs?location=remote",
      },
      {
        name: "정규직",
        description: "정규직 페이지",
        to: "/jobs?type=full-time",
      },
      {
        name: "프리랜서",
        description: "프리랜서 페이지",
        to: "/jobs?type=freelance",
      },
      {
        name: "인턴십",
        description: "인턴십 페이지",
        to: "/jobs?type=internship",
      },
      {
        name: "제출",
        description: "제출 페이지",
        to: "/jobs/submit",
      },
    ],
  },
  {
    name: "커뮤니티",
    to: "/community",
    items: [
      {
        name: "모든 게시글",
        description: "모든 게시글 페이지",
        to: "/community",
      },
      {
        name: "상위 게시글",
        description: "상위 게시글 페이지",
        to: "/community?sort=top",
      },
      {
        name: "최신 게시글",
        description: "최신 게시글 페이지",
        to: "/community?sort=new",
      },
      {
        name: "게시글 작성하기",
        description: "게시글 작성하기 페이지",
        to: "/community/create",
      },
    ],
  },
  {
    name: "아이디어",
    to: "/ideas",
  },
  {
    name: "팀",
    to: "/teams",
    items: [
      {
        name: "팀 모음",
        description: "팀 모음 페이지",
        to: "/teams",
      },
      {
        name: "팀 생성하기",
        description: "팀 생성하기 페이지",
        to: "/teams/create",
      },
    ],
  },
];

export default function Navigation({
  isLoggedIn,
  hasNotifications,
  hasMessages,
}: {
  isLoggedIn: boolean;
  hasNotifications: boolean;
  hasMessages: boolean;
}) {
  return (
    <nav className="flex px-20 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50 bg-background/50">
      <div className="flex items-center">
        <Link to="/" className="font-bold tracking-tighter text-lg mr-4">
          WeMake
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            {menus.map((menu) =>
              menu.items?.length ? (
                <NavigationMenuItem key={menu.name}>
                  <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[600px] font-light gap-3 p-4 grid-cols-2">
                      {menu.items.map((item) => (
                        <NavigationMenuItem
                          key={item.name}
                          className={cn([
                            "select-none rounded-md transition-colors",
                            item.to === "/products/promotion" &&
                              "bg-primary/10 col-span-2",
                            item.to === "/jobs/submit" &&
                              "bg-primary/10 col-span-2",
                          ])}
                        >
                          <NavigationMenuLink asChild>
                            <Link
                              className="p-3 space-y-1 block leading-none no-underline outline-none hover:bg-primary/20"
                              to={item.to}
                            >
                              <span className="text-sm font-medium leading-none">
                                {item.name}
                              </span>
                              <p className="text-xs text-muted-foreground text-gray-300">
                                {item.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={menu.name}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={menu.to}
                      className="inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-primary/20"
                    >
                      {menu.name}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {isLoggedIn ? (
        <div className="flex items-center gap-5">
          <Button size="icon" variant="ghost" className="relative">
            <Link to="/notifications">
              <BellIcon className="size-4" />
            </Link>
            {hasNotifications && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full size-4 flex items-center justify-center">
                1
              </span>
            )}
          </Button>
          <Button size="icon" variant="ghost" className="relative">
            <Link to="/messages">
              <MessageCircleMore className="size-4" />
            </Link>
            {hasMessages && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full size-4 flex items-center justify-center">
                1
              </span>
            )}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="flex flex-col gap-1">
                <span>Mr.Kim</span>
                <span className="text-xs text-muted-foreground text-gray-300">
                  kim@example.com
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white" />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/dashboard">
                    <BarChart3Icon className="size-4" />
                    대시보드
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/profile">
                    <UserIcon className="size-4" />
                    프로필
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/settings">
                    <SettingsIcon className="size-4" />
                    설정
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-white" />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to="/auth/logout">
                  <LogOutIcon className="size-4" />
                  로그아웃
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Button asChild variant="secondary">
            <Link to="/auth/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/auth/join">Join</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
