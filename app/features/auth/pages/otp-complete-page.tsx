import { Button } from "~/common/components/ui/button";

import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";

export default function OtpCompletePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-10">
      <div className="flex flex-col items-center justify-center gap-10 w-1/2">
        <div>
          <h1 className="text-2xl font-semibold">OTP 인증번호 입력</h1>
          <p>이메일로 발송된 인증번호를 입력해주세요.</p>
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
          <InputPair
            label="인증번호"
            name="otp"
            id="otp"
            placeholder="ex) 1234"
            type="number"
            required
          />
          <Button className="w-full" type="submit">
            로그인
          </Button>
        </Form>
      </div>
    </div>
  );
}
