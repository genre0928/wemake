// Drizzle ORM 작성을 통해 Data 관리??? 이 파일의 목적이 무엇인 지 파악해야할 듯
// DB에서 데이터를 가져올 수 있는 방법 - 1. Drizzle ORM 2. Supabase Client 3. SQL Views
// Data 조회만 진행하는 경우 : SQL Views 사용

import db from "~/index";
import { postLikes, posts, topics } from "./schema";
import { count, eq } from "drizzle-orm";
import { profiles } from "../users/schema";
import client from "~/supa-client";

// 토픽 가져오기 drizzle ORM 작성 방법
// export const getTopics = async () => {
//   const allTopics = await db
//     .select({
//       name: topics.name,
//       slug: topics.slug,
//     })
//     .from(topics);
//   return allTopics;
// };

// 토픽 가져오기 Supabase Client 작성 방법
export const getTopics = async () => {
  const { data, error } = await client.from("topics").select("name, slug");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// 게시물 Data 가져오기 drizzel ORM 작성 방법
// export const getPosts = async () => {
//   const allPosts = await db
//     .select({
//       postId: posts.post_id,
//       title: posts.title,
//       content: posts.content,
//       topicName: topics.name,
//       profileId: posts.profile_id,
//       createdAt: posts.created_at,
//       updatedAt: posts.updated_at,
//       nickname: profiles.nickname,
//       avatar: profiles.avatar,
//       likes: count(postLikes.post_id),
//     })
//     .from(posts)
//     .innerJoin(topics, eq(posts.topic_id, topics.topic_id))
//     .innerJoin(profiles, eq(posts.profile_id, profiles.profile_id))
//     .leftJoin(postLikes, eq(posts.post_id, postLikes.post_id))
//     .groupBy(posts.post_id, topics.topic_id, profiles.profile_id);
//   return allPosts;
// };

// 게시물 Data 가져오기 supabase client 작성 방법
// alias:table명!fk키이름!join타입(가져올 column명)
// export const getPosts = async () => {
//   const { data, error } = await client.from("posts").select(`
//         post_id,
//         title,
//         created_at,
//         topic:topics!inner(
//         name),
//         author:profiles!posts_profile_id_profiles_profile_id_fk!inner(
//         name,
//         nickname,
//         avatar
//         ),
//         upvotes:post_likes(
//         count
//         )
//         `);
//   if (error) {
//     throw new Error(error.message);
//   }
//   return data;
// };

// 게시물 Data 가져오기 SQL Views 작성 방법
// view를 통해 데이터를 조회하는 경우 return data의 타입이 nullable이기 때문에 type 에러가 발생하여 이를 처리해야함
// !을 통해 강제로 null을 제거하거나 type-fest 라이브러리를 통해 타입을 오버라이드하여 null 제거
export const getPosts = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 4000));
  const { data, error } = await client
    .from("community_post_list_view")
    .select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
