import { Button } from "~/common/components/ui/button";

import InputPair from "~/common/components/input-pair";
import { Form, Link } from "react-router";
import AuthButton from "../components/auth-button";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 w-1/2 mx-auto">
      {/* 로그인 섹션 */}
      <div className="w-full flex flex-col items-center gap-10">
        <h1 className="text-2xl font-semibold">로그인</h1>
        <Form className="w-3/4 space-y-10">
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
          <Button className="w-full" type="submit">
            로그인
          </Button>
        </Form>
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
