import { DotIcon, HeartIcon } from "lucide-react";
import { Form, Link } from "react-router";
import InputPair from "~/common/components/input-pair";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
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
    <div className="grid grid-cols-6 gap-40 items-start">
      {/* 컨텐츠 섹션 */}
      <div className="col-span-4 space-y-10">
        {/* 브레드크럼 섹션 (경로 표시) */}
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
        {/* 댓글 섹션 */}
        <div className="space-y-5">
          <Form className="flex flex-col gap-5 w-2/3">
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
      </div>
      {/* 사이드바 섹션 */}
      <aside className="col-span-2">사이드바섹션</aside>
    </div>
  );
}
