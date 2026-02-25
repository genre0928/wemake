import { Hero } from "~/common/components/hero";
import { PostCard } from "../components/post-card";
import {
  COMMUNITY_POST_CATEGORIES,
  PERIOD_OPTIONS,
  SORT_OPTIONS,
} from "../constants";
import { Button } from "~/common/components/ui/button";
import { Form, Link, useSearchParams } from "react-router";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "~/common/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { Dropdown } from "react-day-picker";
import { Input } from "~/common/components/ui/input";

export default function CommunityPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "newest";
  const period = searchParams.get("period") || "daily";
  const category = searchParams.get("category") || "";

  const onSortChange = (value: string) => {
    searchParams.set("sort", value);
    setSearchParams(searchParams);
  };
  return (
    <div className="space-y-10">
      <Hero title="커뮤니티" description="커뮤니티 페이지" />
      <div className="grid grid-cols-6 items-start gap-40">
        {/* 커뮤니티 포스트 섹션 */}
        <div className="col-span-4 space-y-5">
          {/* 필터 섹션 */}
          <div className="flex items-center gap-5">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <span className="text-sm capitalize">
                  {
                    SORT_OPTIONS.find(
                      (option: { value: string }) => option.value === sort,
                    )?.label
                  }
                </span>
                <ChevronDownIcon className="size-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {SORT_OPTIONS.map(
                  (option: { label: string; value: string }) => (
                    <DropdownMenuCheckboxItem
                      className="capitalize cursor-pointer"
                      key={option.value}
                      onCheckedChange={(checked: boolean) => {
                        if (checked) {
                          searchParams.set("sort", option.value);
                          setSearchParams(searchParams);
                        }
                      }}
                    >
                      {option.label}
                    </DropdownMenuCheckboxItem>
                  ),
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            {sort === "popular" && (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <span className="text-sm capitalize">
                    {
                      PERIOD_OPTIONS.find(
                        (option: { value: string }) => option.value === period,
                      )?.label
                    }
                  </span>
                  <ChevronDownIcon className="size-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {PERIOD_OPTIONS.map(
                    (option: { label: string; value: string }) => (
                      <DropdownMenuCheckboxItem
                        className="capitalize cursor-pointer"
                        key={option.value}
                        onCheckedChange={(checked: boolean) => {
                          if (checked) {
                            searchParams.set("period", option.value);
                            setSearchParams(searchParams);
                          }
                        }}
                      >
                        {option.label}
                      </DropdownMenuCheckboxItem>
                    ),
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          {/* 검색 및 포스트 생성 섹션 */}
          <div className="flex flex-col gap-10">
            <div className="flex items-center justify-between">
              {/* 검색 섹션 */}
              <div className="w-full">
                <Form className="w-2/3">
                  <Input
                    type="text"
                    name="search"
                    placeholder="검색을 통해 게시물을 찾아보세요"
                  />
                </Form>
              </div>
              {/*포스트 생성 섹션 */}
              <div>
                <Button asChild>
                  <Link to={`/community/create`}>게시물 작성하기</Link>
                </Button>
              </div>
            </div>
            {/* 포스트카드 섹션 */}
            <div className="w-full space-y-10">
              {Array.from({ length: 10 }).map((_, index) => (
                <PostCard
                  key={index}
                  postId={`postId-${index}`}
                  title="게시물 제목"
                  author="작성자"
                  category="카테고리"
                  timeAgo="12시간 전"
                  expanded={true}
                />
              ))}
            </div>
          </div>
        </div>
        {/* 커뮤니티 사이드바 섹션 */}
        <aside className="col-span-2 flex flex-col w-full items-center justify-center gap-4">
          <span className="text-2xl font-bold">카테고리</span>
          <div className="flex flex-col gap-2">
            {COMMUNITY_POST_CATEGORIES.map(
              (category: { label: string; value: string }) => (
                <Button
                  className="text-sm text-foreground"
                  variant="link"
                  asChild
                >
                  <Link to={`/community?category=${category.value}`}>
                    {category.label}
                  </Link>
                </Button>
              ),
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
