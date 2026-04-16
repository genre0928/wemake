import { Link } from "react-router";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import {
  BarChart3Icon,
  BellIcon,
  LogOutIcon,
  MessageCircleMore,
  MoonIcon,
  SettingsIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";
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
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";

const menus = [
  {
    name: "제품",
    to: "/products",
    items: [
      {
        name: "리더보드",
        description: "리더보드 페이지",
        to: "/products/leaderboards",
      },
      {
        name: "카테고리",
        description: "카테고리 페이지",
        to: "/products/categories",
      },
      {
        name: "검색",
        description: "검색 페이지",
        to: "/products/search",
      },
      {
        name: "등록",
        description: "제품 등록 페이지",
        to: "/products/create",
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
        name: "공고 등록",
        description: "공고 등록 페이지",
        to: "/jobs/create",
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

interface NavigationProps {
  isLoggedIn: boolean;
  hasNotifications: boolean;
  hasMessages: boolean;
  profile: {
    avatar: string;
    name: string;
    nickname: string;
    email: string;
  } | null;
  notificationsCount: number;
}

export default function Navigation({
  isLoggedIn,
  hasNotifications,
  hasMessages,
  profile,
  notificationsCount,
}: NavigationProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const handleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <nav className="flex px-20 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50 bg-background/50 gap-20">
      <div className="flex items-center gap-15">
        {/* 로고 섹션 */}
        <Link to="/" className="font-bold tracking-tighter text-lg">
          WeMake
        </Link>
        {/* 네비게이션 메뉴 */}
        <NavigationMenu>
          <NavigationMenuList>
            {menus.map((menu) => (
              <NavigationMenuItem key={menu.name}>
                {menu.items ? (
                  <Link to={menu.to} prefetch="intent">
                    <NavigationMenuTrigger className="bg-transparent">
                      {menu.name}
                    </NavigationMenuTrigger>
                  </Link>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link
                      to={menu.to}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent",
                      )}
                    >
                      {menu.name}
                    </Link>
                  </NavigationMenuLink>
                )}
                {menu.items && (
                  <NavigationMenuContent>
                    <NavigationMenuList className="grid grid-cols-2 w-[600px] p-3 [&>*:last-child:nth-child(odd)]:col-span-2">
                      {menu.items.map((item) => (
                        <NavigationMenuItem key={item.name}>
                          <NavigationMenuLink asChild>
                            <Link to={item.to}>
                              {item.name}
                              <p className="text-sm text-muted-foreground">
                                {item.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      ))}
                    </NavigationMenuList>
                  </NavigationMenuContent>
                )}
              </NavigationMenuItem>
            ))}
            {/* <NavigationMenuItem>
              <NavigationMenuTrigger>트리거</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuItem>
                  <NavigationMenuLink>링크</NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuContent>
            </NavigationMenuItem> */}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Auth 섹션 */}
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-3">
          <Label htmlFor="dark-mode">
            <SunIcon />
          </Label>
          <Switch
            id="dark-mode"
            checked={isDarkMode}
            onCheckedChange={handleDarkMode}
          />
          <Label htmlFor="dark-mode">
            <MoonIcon />
          </Label>
        </div>
        {isLoggedIn ? (
          <div className="flex items-center gap-5">
            <Button size="icon" variant="ghost" className="relative">
              <Link to="/my/notifications">
                <BellIcon className="size-4" />
              </Link>
              {hasNotifications && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full size-4 flex items-center justify-center">
                  {notificationsCount}
                </span>
              )}
            </Button>
            <Button size="icon" variant="ghost" className="relative">
              <Link to="/my/messages">
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
                  {profile?.avatar ? (
                    <AvatarImage src={profile?.avatar} />
                  ) : (
                    <AvatarFallback>{profile?.name.charAt(0)}</AvatarFallback>
                  )}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel className="flex flex-col gap-1">
                  <span>{profile?.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {profile?.email}
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
              <Link to="/auth/login">로그인</Link>
            </Button>
            <Button asChild>
              <Link to="/auth/join">회원가입</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
