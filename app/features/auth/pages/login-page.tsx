import { Button } from "~/common/components/ui/button";

import InputPair from "~/common/components/input-pair";
import { Form, Link, redirect, useNavigation } from "react-router";
import AuthButton from "../components/auth-button";
import type { Route } from "./+types/login-page";
import { LoaderCircleIcon } from "lucide-react";
import z from "zod";
import { makeSSRClient } from "~/supa-client";

const formSchema = z.object({
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
  const { email, password } = data;
  const { client, headers } = makeSSRClient(request);
  const { error: loginError } = await client.auth.signInWithPassword({
    email,
    password,
  });
  if (loginError) {
    return {
      error: loginError.message,
    };
  }
  return redirect("/", { headers: headers });
};

export default function LoginPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="flex flex-col items-center justify-center gap-5 w-1/2 mx-auto">
      {/* 로그인 섹션 */}
      <div className="w-full flex flex-col items-center gap-10">
        <h1 className="text-2xl font-semibold">로그인</h1>
        <Form className="w-3/4 space-y-10" method="post">
          <div className="flex flex-col gap-5">
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
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              "로그인"
            )}
          </Button>
        </Form>
      </div>
      {/* 에러 메시지 */}
      <div>
        {actionData?.formErrors &&
          Object.entries(actionData.formErrors).map(([field, errors]) => (
            <p key={field} className="text-red-500">
              {errors?.join(", ")}
            </p>
          ))}
      </div>
      {/* 회원가입 버튼 */}
      <Button variant="link" asChild>
        <Link to="/auth/join">아직 회원이 아니신가요?</Link>
      </Button>
      {/* 소셜 로그인 */}
      <AuthButton />
    </div>
  );
}
