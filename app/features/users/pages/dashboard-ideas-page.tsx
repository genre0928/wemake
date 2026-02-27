import { IdeaCard } from "~/features/ideas/idea-card";

export default function DashboardIdeasPage() {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">아이디어</h1>
      <div className="grid grid-cols-4 gap-6">
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
