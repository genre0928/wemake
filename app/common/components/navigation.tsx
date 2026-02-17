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
  return (
    <nav className="flex px-20 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50 bg-background/50">
      <div className="flex items-center gap-10">
        <Link to="/" className="font-bold tracking-tighter text-lg">
          WeMake
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            {menus.map((menu) =>
              menu.items?.length ? (
                <NavigationMenuItem key={menu.name}>
                  {/* 네비게이션 메뉴 트리거(제품, 직업, 커뮤니티 등) - items가 있을 때만 드롭다운 */}
                  <Link to={menu.to}>
                    <NavigationMenuTrigger className="bg-transparent">
                      {menu.name}
                    </NavigationMenuTrigger>
                  </Link>
                  <NavigationMenuContent>
                    <ul className="grid w-[600px] font-light gap-3 p-4 grid-cols-2">
                      {menu.items.map((item) => (
                        <NavigationMenuItem
                          key={item.name}
                          className="select-none rounded-md transition-colors"
                        >
                          <NavigationMenuLink asChild>
                            <Link
                              className="p-3 space-y-1 block leading-none no-underline outline-none"
                              to={item.to}
                            >
                              <span className="text-sm font-medium leading-none">
                                {item.name}
                              </span>
                              <p className="text-sm text-muted-foreground">
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
                      className="px-4 py-2 text-sm font-medium"
                    >
                      {menu.name}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ),
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
