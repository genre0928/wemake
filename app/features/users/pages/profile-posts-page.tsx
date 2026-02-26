import { PostCard } from "~/features/community/components/post-card";

export default function ProfilePostsPage() {
  return (
    <div className="space-y-5">
      {Array.from({ length: 10 }).map((_, index) => (
        <PostCard
          key={index}
          postId={`postId-${index}`}
          title="title"
          author="author"
          category="category"
          timeAgo="timeAgo"
        />
      ))}
    </div>
  );
}
