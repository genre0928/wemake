// 렌더링 없이 community 페이지의 upvote 기능을 구현하기 위한 페이지

import { getLoggedInUserId } from "~/features/users/queries";
import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/post-upvote-page";
import { toggleUpvote } from "../mutations";

export const action = async ({ request, params }: Route.ActionArgs) => {
  if (request.method !== "POST") {
    return {
      success: false,
      error: "Method not allowed",
    };
  }
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  await toggleUpvote(client, { userId, postId: Number(params.postId) });

  return {
    success: true,
  };
};
