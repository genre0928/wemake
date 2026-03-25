import { Hero } from "~/common/components/hero";
import { PostCard } from "../components/post-card";
import {
  COMMUNITY_POST_CATEGORIES,
  PERIOD_OPTIONS,
  SORT_OPTIONS,
} from "../constants";
import { Button } from "~/common/components/ui/button";
import { Await, Form, Link, useSearchParams } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "~/common/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { Input } from "~/common/components/ui/input";
import { getPosts, getTopics } from "../queries";
import { posts, topics } from "../schema";
import type { Route } from "./+types/community-page";
import { Suspense } from "react";
import z from "zod";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";

const searchParamsSchema = z.object({
  sort: z.enum(["newest", "popular"]).optional().default("newest"),
  period: z
    .enum(["daily", "weekly", "monthly", "yearly", "all"])
    .optional()
    .default("all"),
  keyword: z.string().optional(),
  category : z.string().optional(),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { success, data } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams),
  );
  if (!success) {
    throw new Error("Invalid parameters");
  }
  const { sort, period, keyword, category } = data;
  const { client } = makeSSRClient(request);
  const [topics, posts] = await Promise.all([
    getTopics(client),
    getPosts(client, { limit: 7, sort, period, keyword, category }),
  ]);
  return { topics, posts };
};

export default function CommunityPage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortedValue = searchParams.get("sort") || "newest";
  const periodValue = searchParams.get("period") || "daily";
  const category = searchParams.get("category") || "";
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
                      (option: { value: string }) =>
                        option.value === sortedValue,
                    )?.label
                  }
                </span>
                <ChevronDownIcon className="size-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {SORT_OPTIONS.map(
                  (option: { label: string; value: string }) => (
                    <DropdownMenuCheckboxItem
                      className="cursor-pointer"
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
            {sortedValue === "popular" && (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <span className="text-sm capitalize">
                    {
                      PERIOD_OPTIONS.find(
                        (option: { value: string }) =>
                          option.value === periodValue,
                      )?.label
                    }
                  </span>
                  <ChevronDownIcon className="size-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {PERIOD_OPTIONS.map(
                    (option: { label: string; value: string }) => (
                      <DropdownMenuCheckboxItem
                        className="cursor-pointer"
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
                    name="keyword"
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
            <Suspense fallback={<div>Loading...</div>}>
              {loaderData.posts.map((post) => (
                <PostCard
                  key={post.post_id}
                  postId={post.post_id!}
                  title={post.title!}
                  author={post.nickname!}
                  category={post.topic!}
                  timeAgo={DateTime.fromISO(post.created_at!)}
                  expanded={true}
                  upvotes={post.upvotes!}
                />
              ))}
            </Suspense>
          </div>
        </div>
        {/* 커뮤니티 사이드바 섹션 */}
        <aside className="col-span-2 flex flex-col w-full items-center justify-center gap-4">
          <span className="text-2xl font-bold">카테고리</span>
          <Suspense fallback={<div>Loading...</div>}>
            {loaderData.topics.map((topic) => (
              <div className="flex flex-col gap-2">
                <Button
                  className="text-sm text-foreground"
                  variant="link"
                  asChild
                >
                  <Link to={`/community?category=${topic.name}`}>
                    {topic.name}
                  </Link>
                </Button>
              </div>
            ))}
          </Suspense>
        </aside>
      </div>
    </div>
  );
}
