import {
  EyeIcon,
  GlobeIcon,
  HeartIcon,
  MessageCircleIcon,
  StarIcon,
} from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";

export default function ProductOverviewPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex justify-between">
        {/* 제품 정보 섹션 */}
        <div className="flex gap-4">
          <div className="size-40 rounded-xl shadow-xl bg-primary/50"></div>
          <div className="space-y-5">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">productId</h1>
              <p className="text-2xl font-light">상세내용</p>
              <p className="text-sm text-muted-foreground">웹사이트 방문하기</p>
            </div>
            <div className="mt-5 flex items-center gap-2">
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon
                    key={index}
                    className="size-4"
                    fill="currentColor"
                  />
                ))}
              </div>
              <span className="font-medium">100개의 리뷰</span>
            </div>
          </div>
        </div>
        {/* 좋아요 버튼 */}
        <div className="flex items-center justify-center">
          <Link to="/products/productId/overview">
            <Button variant="outline" className="size-24">
              <HeartIcon className="size-4 text-red-500" fill="currentColor" />
              좋아요
            </Button>
          </Link>
        </div>
      </div>
      {/* Content */}
      <div className="flex gap-2">
        <Link to="/products/productId/reviews">
          <Button variant="outline">
            <EyeIcon className="size-4" />
            미리 보기
          </Button>
        </Link>
        <Link to="/products/productId/reviews/new">
          <Button variant="outline">
            <MessageCircleIcon className="size-4" />
            리뷰 보기
          </Button>
        </Link>
      </div>
      <div>제품</div>
    </div>
  );
}
