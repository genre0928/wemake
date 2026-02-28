import { Form, Link } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import AuthButton from "../components/auth-button";

export default function JoinPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-10">
      <div className="flex flex-col items-center justify-center gap-10 w-1/2">
        <h1 className="text-2xl font-semibold">계정 생성하기</h1>
        <Form className="w-3/4 space-y-10">
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
          <Button className="w-full" type="submit">
            계정 생성하기
          </Button>
        </Form>
        <AuthButton />
      </div>
    </div>
  );
}
