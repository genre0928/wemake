import { Link } from "react-router";
import { Separator } from "./ui/separator";
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
  MessageCircleIcon,
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
        name: "제출",
        description: "제출 페이지",
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
}

export default function Navigation({
  isLoggedIn,
  hasNotifications,
  hasMessages,
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
              <NavigationMenuItem>
                {menu.items ? (
                  <NavigationMenuTrigger className="bg-transparent">
                    {menu.name}
                  </NavigationMenuTrigger>
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
        <div className="flex gap-4">
          <Button asChild variant="secondary">
            <Link to="/auth/login">로그인</Link>
          </Button>
          <Button asChild>
            <Link to="/auth/join">회원가입</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
