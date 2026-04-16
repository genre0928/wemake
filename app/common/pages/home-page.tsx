import { data, Link } from "react-router";
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
import { getJobs } from "~/features/jobs/queries";
import { makeSSRClient } from "~/supa-client";
import { getTeams } from "~/features/teams/queries";
import { TeamCard } from "~/features/teams/components/team-card";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Home | Wemake" },
    { name: "description", content: "Home page of Wemake" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const products = await getProductsByDateRange(client, {
    startDate: DateTime.now().startOf("day"),
    endDate: DateTime.now().endOf("day"),
    limit: 7,
  });

  const posts = await getPosts(client, {
    limit: 7,
    sort: "newest",
  });

  const ideas = await getIdeas(client, { limit: 7 });
  const jobs = await getJobs(client, { limit: 11 });
  const teams = await getTeams(client, { limit: 7 });

  return {
    products,
    posts,
    ideas,
    jobs,
    teams,
  };
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
        {loaderData.products.map((product) => (
          <ProductCard
            key={product.product_id}
            productId={product.product_id}
            name={product.name}
            description={product.description}
            reviews={product.reviews}
            views={product.views}
            upvotes={product.upvotes}
            createdAt={product.created_at}
          />
        ))}
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
            key={post.post_id}
            postId={post.post_id!}
            title={post.title!}
            author={post.nickname!}
            category={post.topic!}
            timeAgo={DateTime.fromISO(post.created_at!)}
            upvotes={post.upvotes!}
            isUpvoted={post.is_upvoted}
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
            isLiked={idea.is_upvoted}
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
        {loaderData.jobs.map((job) => (
          <JobCard
            key={job.job_id}
            jobId={job.job_id}
            companyName={job.company_name}
            timeAgo={job.created_at}
            title={job.position}
            tags={job.skills.split(",")}
            salary={[
              Number(job.salary.split("-")[0]),
              Number(job.salary.split("-")[1]),
            ]}
            location={job.company_location}
          />
        ))}
      </div>
      {/* 팀 */}
      <div className="grid grid-cols-3 gap-4">
        <SectionHeader
          title="팀원 모집"
          description="현재 팀원을 모집중인 팀을 확인해보세요"
          linkTo="/teams"
        />
        {loaderData.teams.map((team) => (
          <TeamCard
            key={team.team_id}
            teamId={team.team_id}
            title={team.name}
            description={team.description}
            tags={team.position.split(",")}
            authorNickname={team.team_leader.name}
            authorAvatarUrl={team.team_leader.avatar}
          />
        ))}
      </div>
    </div>
  );
}
