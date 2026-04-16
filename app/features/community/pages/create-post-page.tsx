import { Form, redirect, useNavigation } from "react-router";
import { Hero } from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { COMMUNITY_POST_CATEGORIES } from "../constants";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/create-post-page";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { getTopics } from "../queries";
import z from "zod";
import { createPost } from "../mutations";
import { LoaderCircleIcon } from "lucide-react";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
  const topics = await getTopics(client);
  return { topics };
};

const formSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  category: z.string().min(1),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) {
    return { formErrors: error.flatten().fieldErrors };
  }
  const { title, content, category } = data;
  const { post_id } = await createPost(client, {
    title,
    content,
    category,
    userId,
  });
  return redirect(`/community/${post_id}`);
};

export default function CreatePostPage({ loaderData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="space-y-10">
      <Hero
        title="게시글 작성 페이지"
        description="작성하고자 하는 게시글에 대해 설명해주세요"
      />
      <Form className="space-y-20 max-w-2xl mx-auto" method="post">
        <div className="space-y-5">
          <InputPair
            label="제목"
            description="제목을 입력해주세요"
            name="title"
            id="title"
            placeholder="제목"
          />
          <SelectPair
            label="카테고리"
            description="카테고리를 선택해주세요"
            name="category"
            placeholder="카테고리"
            options={loaderData.topics.map((topic) => ({
              label: topic.name,
              value: topic.slug,
            }))}
          />
          <InputPair
            label="내용"
            description="내용을 입력해주세요"
            name="content"
            id="content"
            placeholder="내용"
            textArea
          />
        </div>
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? <LoaderCircleIcon className="animate-spin" /> : "작성하기"}
        </Button>
      </Form>
    </div>
  );
}
