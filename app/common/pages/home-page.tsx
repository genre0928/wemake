import { Link } from "react-router";
import { SectionHeader } from "../components/section-header";
import type { Route } from "./+types/home-page";
import { ProductCard } from "~/features/products/components/product-card";
import { PostCard } from "~/features/community/components/post-card";
import { IdeaCard } from "~/features/ideas/components/idea-card";
import { JobCard } from "~/features/jobs/components/job-card";
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
import { IconCloud } from "../components/ui/icon-cloud";
import { getProductsByDateRange } from "~/features/products/queries";
import { DateTime } from "luxon";
import { getPosts } from "~/features/community/queries";
import { getIdeas } from "~/features/ideas/queries";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Home | Wemake" },
    { name: "description", content: "Home page of Wemake" },
  ];
};

export const loader = async () => {
  const products = await getProductsByDateRange({
    startDate: DateTime.now().startOf("day"),
    endDate: DateTime.now().endOf("day"),
    limit: 7,
  });

  const posts = await getPosts({
    limit: 7,
    sort: "newest",
  });

  const ideas = await getIdeas({});

  return { products, posts, ideas };
};

export default function HomePage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-30">
      {/* 오늘의 제품 */}
      <div className="grid grid-cols-3 gap-4">
        <SectionHeader
          title="오늘의 제품"
          description="오늘 커뮤니티에서 가장 인기 있는 제품을 확인해보세요"
          linkTo="/products/leaderboards"
        />
        {loaderData.products.map((product) => {
          const stats = product.stats as { reviews: number; views: number };
          return (
            <ProductCard
              productId={product.product_id}
              name={product.name}
              description={product.description}
              commentCount={stats?.reviews}
              viewCount={stats?.views}
              likeCount={product.upvotes}
            />
          );
        })}
      </div>
      {/* 커뮤니티 게시글 */}
      <div className="grid grid-cols-3 gap-4">
        <SectionHeader
          title="오늘의 커뮤니티 토론"
          description="현재 가장 인기 있는 커뮤니티 게시글을 확인해보세요."
          linkTo="/community"
        />
        {loaderData.posts.map((post) => (
          <PostCard
            postId={post.post_id!}
            title={post.title!}
            author={post.nickname!}
            category={post.topic!}
            timeAgo={new Date(post.created_at!)}
            upvotes={post.upvotes!}
          />
        ))}
      </div>
      {/* 아이디어 */}
      <div className="grid grid-cols-3 gap-4">
        <SectionHeader
          title="오늘의 아이디어"
          description="내가 찾는 아이디어를 먼저 선점해보세요"
          linkTo="/ideas"
        />
        {loaderData.ideas.map((idea) => (
          <IdeaCard
            key={idea.idea_id}
            ideaId={idea.idea_id}
            title={idea.title}
            viewCount={idea.views}
            timeAgo={idea.created_at}
            likeCount={idea.upvotes}
            isClaimed={idea.is_claimed}
          />
        ))}
      </div>
      {/* 직업 */}
      <div className="grid grid-cols-4 gap-4">
        <SectionHeader
          title="채용 공고"
          description="현재 채용중인 공고를 확인해보세요"
          linkTo="/jobs"
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
          title="팀원 모집"
          description="현재 팀원을 모집중인 팀을 확인해보세요"
          linkTo="/teams"
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
