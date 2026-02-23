import { Button } from "~/common/components/ui/button";
import { ReviewCard } from "~/features/products/components/review-card";

export default function ProductReviewsPage() {
  return (
    <div>
      <div className="max-w-1/2 space-y-5">
        {/* 리뷰 총 갯수와 리뷰 작성하기 섹션 */}
        <div className="flex justify-between items-center">
          <h2>10개의 리뷰</h2>
          <Button variant="secondary">리뷰 작성하기</Button>
        </div>
        {/* 작성된 리뷰 섹션 */}
        <div className="space-y-20">
          <ReviewCard
            displayName="John Doe"
            username="username"
            rating={2}
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
            dateText="5일 전"
            showActions
          />
        </div>
      </div>
    </div>
  );
}
