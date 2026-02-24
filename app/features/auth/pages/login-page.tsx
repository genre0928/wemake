import { Button } from "~/common/components/ui/button";

import InputPair from "~/common/components/input-pair";
import { Form, Link } from "react-router";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-10 relative">
      <Button variant="outline" className="absolute top-10 right-10" asChild>
        <Link to="/auth/join">회원가입</Link>
      </Button>
      <div className="flex flex-col items-center justify-center gap-10 w-1/2">
        <h1 className="text-2xl font-semibold">로그인</h1>
        <Form className="w-3/4 space-y-10">
          <div className="flex flex-col gap-10">
            <InputPair
              label="이메일"
              name="email"
              id="email"
              placeholder="example@example.com"
              required
            />
            <InputPair
              label="비밀번호"
              name="password"
              id="password"
              placeholder="********"
              required
            />
          </div>
          <Button className="w-full" type="submit">
            로그인
          </Button>
        </Form>
      </div>
    </div>
  );
}
