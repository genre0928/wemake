import { PostCard } from "~/features/community/components/post-card";
import type { Route } from "./+types/profile-posts-page";
import { useOutletContext } from "react-router";
import { getUserPosts } from "../queries";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const posts = await getUserPosts(client, params.nickname);
  return { posts };
};

export default function ProfilePostsPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-5">
      {loaderData.posts.map((post) => (
        <PostCard
          key={post.post_id}
          postId={post.post_id}
          title={post.title}
          author={post.author}
          category={post.topic}
          timeAgo={DateTime.fromISO(post.created_at)}
          upvotes={post.upvotes}
        />
      ))}
    </div>
  );
}
