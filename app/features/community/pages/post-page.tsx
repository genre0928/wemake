import { DotIcon, HeartIcon } from "lucide-react";
import { Form, Link } from "react-router";
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

export default function PostPage() {
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
                <Link to="/community?category=123">카테고리</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/community/postId">게시글 제목</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {/* 컨텐츠 섹션 */}
      <div className="col-span-4 space-y-10">
        {/* 게시글 정보 섹션 */}
        <div className="flex w-full items-start gap-10">
          <Button variant="outline" className="flex flex-col size-16">
            <HeartIcon className="size-4 shrink-0" />
            <span>10</span>
          </Button>
          <div className="space-y-20 w-full">
            <div className="flex flex-col gap-2 w-3/4">
              <h2 className="text-3xl font-bold">게시글 제목</h2>
              <div className="flex items-center gap-2 text-sm leading-tight text-muted-foreground">
                <div>@nickname</div>
                <DotIcon className="size-4" />
                <div>12시간 전</div>
                <DotIcon className="size-4" />
                <div>10개의 댓글</div>
              </div>
              <p className="text-muted-foreground">
                제가 작성한 게시글의 내용은 이러합니다.
              </p>
            </div>
          </div>
        </div>
        {/* 댓글 작성 섹션 */}
        <div className="pl-26">
          <Form className="flex flex-col gap-5 w-3/4">
            <div className="flex gap-5">
              <Avatar className="size-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <InputPair
                name="comment"
                id="comment"
                placeholder="댓글을 입력해주세요"
                textArea
              />
            </div>
            <div className="flex justify-end">
              <Button variant="default" type="submit">
                댓글 작성
              </Button>
            </div>
          </Form>
        </div>
        {/* 댓글 목록 섹션 */}
        <div className="space-y-10 pl-26">
          <h4 className="font-semibold">10개의 댓글</h4>
          <ReplyCard
            nickname="닉네임"
            content="나는 이 글의 내용에 대해 전적으로 동의해, 왜냐하면 나도 비슷한 경험이 있기 때문이야"
            timeAgo="1분 전"
            topLevel
          />
        </div>
      </div>
      {/* 사이드바 섹션 */}
      <aside className="col-span-2 border rounded-lg shadow-sm p-6 space-y-3">
        <div className="flex gap-5">
          <Avatar className="size-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h4 className="text-lg font-medium">닉네임</h4>
            <Badge variant="secondary">직업</Badge>
          </div>
        </div>
        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
          <span>🎂 가입일 : 2026-02-26</span>
          <span>🚀 게시글 : 10개</span>
        </div>
        <Button variant="outline" className="w-full">
          팔로우하기
        </Button>
      </aside>
    </div>
  );
}
