import InputPair from "~/common/components/input-pair";

import { Button } from "~/common/components/ui/button";
import { Form } from "react-router";

export default function OtpStartPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-10">
      <div className="flex flex-col items-center justify-center gap-10 w-1/2">
        <div>
          <h1 className="text-2xl font-semibold">OTP 로그인</h1>
          <p>이메일로 인증 코드를 발송합니다.</p>
        </div>
        <Form className="w-3/4 space-y-10">
          <InputPair
            label="이메일"
            name="email"
            id="email"
            placeholder="example@example.com"
            type="email"
            required
          />
          <Button className="w-full" type="submit">
            인증 코드 발송
          </Button>
        </Form>
      </div>
    </div>
  );
}
