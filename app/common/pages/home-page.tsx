import { Link } from "react-router";
import { SectionHeader } from "../components/section-header";
import type { Route } from "./+types/home-page";
import { ProductCard } from "~/features/products/components/product-card";
import { PostCard } from "~/features/community/post-card";
import { IdeaCard } from "~/features/ideas/idea-card";
import { JobCard } from "~/features/job/job-card";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { SquareArrowOutUpRight } from "lucide-react";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Home | Wemake" },
    { name: "description", content: "Home page of Wemake" },
  ];
};

export default function HomePage() {
  return (
    <div className="space-y-40">
      {/* 오늘의 제품 */}
      <div className="grid grid-cols-3 gap-4">
        <SectionHeader
          title="오늘의 제품"
          description="커뮤니티에서 가장 인기 있는 제품을 확인해보세요."
          linkTo="/products/leaderboards"
          linkText="모든 리더보기 보러가기"
        />
        <ProductCard
          productId="productId"
          name="제품명"
          description="제품 설명"
          commentCount={10}
          viewCount={10}
          likeCount={10}
          isLiked={false}
        />
      </div>
      {/* 토론 */}
      <div className="grid grid-cols-3 gap-4">
        <SectionHeader
          title="오늘의 토론"
          description="커뮤니티에서 가장 인기 있는 토론을 확인해보세요."
          linkTo="/community"
          linkText="모든 토론 보러가기"
        />
        <PostCard
          postId="postId"
          title="토론 제목"
          author="작성자"
          category="카테고리"
          timeAgo="12시간 전"
        />
      </div>
      {/* 아이디어 */}
      <div className="grid grid-cols-3 gap-4">
        <SectionHeader
          title="오늘의 아이디어"
          description="프로젝트에 필요한 아이디어를 찾아보세요"
          linkTo="/ideas"
          linkText="모든 아이디어 보러가기"
        />
        <IdeaCard
          ideaId="ideaId"
          title="아이디어 제목 이렇게 이렇게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길고 길고 길 asd"
          viewCount={10}
          timeAgo="12시간 전"
          likeCount={10}
          isClaimed={false}
        />
      </div>
      {/* 직업 */}
      <div className="grid grid-cols-4 gap-4">
        <SectionHeader
          title="오늘의 직업"
          description="오늘의 직업을 확인해보세요"
          linkTo="/jobs"
          linkText="모든 직업 보러가기"
        />
        <JobCard
          jobId="jobId"
          companyName="테슬라"
          timeAgo="12시간 전"
          title="프론트엔드 개발자"
          tags={["프론트엔드", "개발", "테슬라"]}
          salary={[3500, 4000]}
          location="경상북도 구미시"
        />
      </div>
      {/* 팀 섹션 */}
      <div className="grid grid-cols-3 gap-4">
        <SectionHeader
          title="구인구직"
          description="등록된 모든 팀을 확인해보세요"
          linkTo="/teams"
          linkText="모든 팀 보러가기"
        />
        <Link to="/teams/teamId">
          <Card className="bg-transparent hover:bg-primary/10 transition-colors duration-200 ease-in-out">
            <CardHeader className="flex items-center">
              <CardTitle className="line-clamp-1 text-xl flex items-center justify-between w-full">
                <span>모바일게임 BM 기능 구현</span>
                <SquareArrowOutUpRight className="size-4 shrink-0" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm line-clamp-2">
                BM 구현을 위한 기술을 가진 팀원을 구합니다 자격이 있으신 분들은
                지원해주세요
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="ghost"
                  className="flex items-center gap-2 text-base"
                >
                  <span>프론트엔드</span>
                </Badge>
                <Badge
                  variant="ghost"
                  className="flex items-center gap-2 text-base"
                >
                  <span>백엔드</span>
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <div>
                <Badge
                  variant="ghost"
                  className="flex items-center gap-2 text-base"
                >
                  <span>@nickname</span>
                  <Avatar className="size-4">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>N</AvatarFallback>
                  </Avatar>
                </Badge>
              </div>
            </CardFooter>
          </Card>
        </Link>
      </div>
    </div>
  );
}
