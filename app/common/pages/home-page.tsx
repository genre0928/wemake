import { Link } from "react-router";
import { Button } from "../components/ui/button";
import type { Route } from "./+types/home-page";
import { ProductCard } from "~/features/products/components/product-card";
import { PostCard } from "~/features/community/post-card";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Home | Wemake" },
    { name: "description", content: "Home page of Wemake" },
  ];
};

export default function HomePage() {
  return (
    <div className="px-20 space-y-40">
      {/* 오늘의 제품 */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            오늘의 제품
          </h2>
          <p className="text-xl font-light text-foreground">
            커뮤니티에서 가장 인기 있는 제품을 확인해보세요.
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/products/leaderboard">모든 리더보기 보러가기 →</Link>
          </Button>
        </div>
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
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            오늘의 토론
          </h2>
          <p className="text-xl font-light text-foreground">
            커뮤니티에서 가장 인기 있는 토론을 확인해보세요.
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/community">모든 토론 보러가기 →</Link>
          </Button>
        </div>
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
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            오늘의 아이디어
          </h2>
          <p className="text-xl font-light text-foreground">
            프로젝트에 필요한 아이디어를 찾아보세요
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/ideas">모든 아이디어 보러가기 →</Link>
          </Button>
        </div>
        <IdeaCard
          ideaId="ideaId"
          title="아이디어 제목 이렇게 이렇게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길고 길고 길 asd"
          viewCount={10}
          timeAgo="12시간 전"
          likeCount={10}
        />
      </div>
    </div>
  );
}
