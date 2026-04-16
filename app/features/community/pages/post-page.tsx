import { DotIcon, HeartIcon, LoaderCircleIcon } from "lucide-react";
import {
  Form,
  Link,
  redirect,
  useFetcher,
  useNavigation,
  useOutletContext,
} from "react-router";
import InputPair from "~/common/components/input-pair";
import { ReplyCard } from "~/features/community/components/reply-card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/common/components/ui/breadcrumb";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/post-page";
import { getPostById, getPosts, getReplies } from "../queries";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import z from "zod";
import { createReply } from "../mutations";
import { useEffect, useRef } from "react";
import { cn } from "~/lib/utils";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const post = await getPostById(client, Number(params.postId));
  if (!post) {
    throw new Error("Post not found");
  }
  const replies = await getReplies(client, Number(params.postId));
  return { post, replies };
};

export const formSchema = z.object({
  comment: z.string().min(1),
  topLevelId: z.coerce.number().optional(),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) {
    return { formErrors: error.flatten().fieldErrors };
  }
  const { comment, topLevelId } = data;
  await createReply(client, {
    comment,
    userId,
    postId: Number(params.postId),
    topLevelId,
  });
  return { success: true };
};

export default function PostPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const upvoteFetcher = useFetcher();
  const replyFetcher = useFetcher();
  const optimisticVotesCount =
    upvoteFetcher.state === "idle"
      ? loaderData.post.upvotes
      : loaderData.post.upvotes + 1;
  const optimisticIsUpvoted = upvoteFetcher.state === "idle" ? false : true;
  const upvoteHandler = async () => {
    await upvoteFetcher.submit(null, {
      method: "post",
      action: `/community/${loaderData.post.post_id}/upvote`,
    });
  };
  const { isLoggedIn, userProfile } = useOutletContext<{
    isLoggedIn: boolean;
    userProfile: {
      avatar?: string;
      name?: string;
      nickname?: string;
      email?: string;
    } | null;
  }>();
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  const inputRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (actionData?.success) {
      inputRef.current?.reset();
    }
  }, [actionData?.success]);
  return (
    <div className="grid grid-cols-6 gap-10 items-start">
      {/* 브레드크럼 섹션 (경로 표시) */}
      <div className="col-span-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/community">커뮤니티</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/community?category=${loaderData.post.topic_name}`}>
                  {loaderData.post.topic_name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/community/${loaderData.post.post_id}`}>
                  {loaderData.post.title}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {/* 컨텐츠 섹션 */}
      <div className="col-span-4 space-y-10">
        {/* 게시글 정보 섹션 */}
        <div className="flex w-full items-start gap-10">
          <upvoteFetcher.Form
            className={cn(
              "flex flex-col size-16 cursor-pointer",
              optimisticIsUpvoted && "border-primary dark:border-primary",
            )}
            onClick={upvoteHandler}
          >
            <Button
              variant="outline"
              className="flex flex-col size-16 cursor-pointer"
            >
              <HeartIcon className="size-4 shrink-0" />
              <span>10</span>
            </Button>
          </upvoteFetcher.Form>
          <div className="space-y-20 w-full">
            <div className="flex flex-col gap-2 w-3/4">
              <h2 className="text-3xl font-bold">{loaderData.post.title}</h2>
              <div className="flex items-center gap-2 text-sm leading-tight text-muted-foreground">
                <div>@{loaderData.post.author_nickname}</div>
                <DotIcon className="size-4" />
                <div>
                  {DateTime.fromISO(loaderData.post.created_at).toRelative()}
                </div>
                <DotIcon className="size-4" />
                <div>{loaderData.post.replies}개의 댓글</div>
              </div>
              <p className="text-muted-foreground">{loaderData.post.content}</p>
            </div>
          </div>
        </div>
        {/* 댓글 작성 섹션 */}
        <div className="pl-26">
          <Form
            className="flex flex-col gap-5 w-3/4"
            method="post"
            ref={inputRef}
          >
            <div className="flex gap-5">
              <Avatar className="size-10">
                {userProfile?.avatar ? (
                  <AvatarImage src={userProfile.avatar} />
                ) : (
                  <AvatarFallback>
                    {userProfile?.nickname?.[0] ?? "CN"}
                  </AvatarFallback>
                )}
              </Avatar>
              <InputPair
                name="comment"
                id="comment"
                placeholder={
                  isLoggedIn
                    ? "댓글을 입력해주세요"
                    : "로그인 후 댓글을 작성해주세요"
                }
                textArea
                disabled={!isLoggedIn}
              />
            </div>
            <div className="flex justify-end">
              <Button
                variant="default"
                type="submit"
                disabled={isSubmitting || !isLoggedIn}
              >
                {isSubmitting ? (
                  <LoaderCircleIcon className="animate-spin" />
                ) : (
                  "댓글 작성"
                )}
              </Button>
            </div>
          </Form>
        </div>
        {/* 댓글 목록 섹션 */}
        <div className="space-y-10 pl-26">
          <h4 className="font-semibold">
            {loaderData.replies.length}개의 댓글
          </h4>
          {loaderData.replies.map((reply) => (
            <ReplyCard
              key={reply.created_at}
              nickname={reply.profiles.nickname}
              content={reply.content}
              timeAgo={DateTime.fromISO(reply.created_at)}
              topLevel={true}
              replies={reply.post_replies}
              topLevelId={reply.reply_id}
            />
          ))}
        </div>
      </div>
      {/* 사이드바 섹션 */}
      <aside className="col-span-2 border rounded-lg shadow-sm p-6 space-y-3">
        <div className="flex gap-5">
          <Avatar className="size-10">
            <AvatarImage src={loaderData.post.author_avatar ?? ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h4 className="text-lg font-medium">
              @{loaderData.post.author_nickname}
            </h4>
            <Badge variant="secondary">{loaderData.post.author_position}</Badge>
          </div>
        </div>
        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>🎂 가입일 : </span>
            <span>
              {DateTime.fromISO(loaderData.post.author_created_at).toFormat(
                "yyyy-MM-dd",
              )}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span>🚀 게시글 : </span>
            <span>{loaderData.post.products}개</span>
          </div>
        </div>
        <Button variant="outline" className="w-full">
          팔로우하기
        </Button>
      </aside>
    </div>
  );
}
