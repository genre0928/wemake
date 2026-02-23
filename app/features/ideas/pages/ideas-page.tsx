import { Hero } from "~/common/components/hero";
import { IdeaCard } from "../idea-card";

export default function IdeasPage() {
  return (
    <div>
      <Hero title="아이디어" description="아이디어 페이지" />
      <div className="grid grid-cols-4 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 10 }).map((_, index) => (
          <IdeaCard
            key={index}
            ideaId={`ideaId-${index}`}
            title="아이디어 제목"
            viewCount={10}
            timeAgo="12시간 전"
            likeCount={10}
            isLiked={false}
            isClaimed={false}
          />
        ))}
      </div>
    </div>
  );
}
