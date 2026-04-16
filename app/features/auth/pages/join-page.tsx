import { Form, Link, redirect, useNavigation } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import AuthButton from "../components/auth-button";
import type { Route } from "./+types/join-page";
import { makeSSRClient } from "~/supa-client";
import z from "zod";
import { checkUsernameExists } from "../queries";
import { LoaderCircleIcon } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1),
  nickname: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) {
    return {
      formErrors: error.flatten().fieldErrors,
    };
  }
  const usernameExists = await checkUsernameExists(request, {
    nickname: data.nickname,
  });
  if (usernameExists) {
    return {
      formErrors: {
        nickname: ["닉네임이 이미 존재합니다."],
      },
    };
  }
  const { client, headers } = makeSSRClient(request);
  const { error: signUpError } = await client.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
        nickname: data.nickname,
      },
    },
  });
  if (signUpError) {
    return {
      error: signUpError.message,
    };
  }
  return redirect("/", { headers: headers });
};

export default function JoinPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="flex flex-col items-center justify-center h-full gap-10">
      <div className="flex flex-col items-center justify-center gap-10 w-1/2">
        <h1 className="text-2xl font-semibold">계정 생성하기</h1>
        <Form className="w-3/4 space-y-10" method="post">
          <div className="flex flex-col gap-5">
            <InputPair
              label="이름"
              name="name"
              id="name"
              placeholder="이름"
              required
            />
            <InputPair
              label="닉네임"
              name="nickname"
              id="nickname"
              placeholder="닉네임"
              required
            />
            <InputPair
              label="이메일"
              name="email"
              id="email"
              placeholder="example@example.com"
              type="email"
              required
            />
            <InputPair
              label="비밀번호"
              name="password"
              id="password"
              placeholder="********"
              type="password"
              required
            />
          </div>
          {actionData?.formErrors &&
            Object.entries(actionData.formErrors).map(([field, errors]) => (
              <p key={field} className="text-red-500">
                {errors?.join(", ")}
              </p>
            ))}
          {actionData?.error && (
            <p className="text-red-500">{actionData.error}</p>
          )}
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              "계정 생성하기"
            )}
          </Button>
        </Form>
        <AuthButton />
      </div>
    </div>
  );
}
