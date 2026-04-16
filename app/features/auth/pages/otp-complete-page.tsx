import { Button } from "~/common/components/ui/button";

import { Form, redirect, useNavigation, useSearchParams } from "react-router";
import InputPair from "~/common/components/input-pair";
import z from "zod";
import type { Route } from "./+types/otp-complete-page";
import { makeSSRClient } from "~/supa-client";
import { LoaderCircleIcon } from "lucide-react";

const formSchema = z.object({
  phone: z.string(),
  otp: z.string().min(6).max(6),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { data, success, error } = formSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) {
    return {
      formErrors: error.flatten().fieldErrors,
    };
  }
  const { phone, otp } = data;
  const { client, headers } = makeSSRClient(request);
  const { error: otpError } = await client.auth.verifyOtp({
    phone,
    token : otp,
    type : "sms",
  });
  if (otpError) {
    return {
      error: otpError.message,
    };
  }
  return redirect("/", { headers: headers });
};

export default function OtpCompletePage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  const [searchParams] = useSearchParams();
  const phone = searchParams.get("phone");
  return (
    <div className="flex flex-col items-center justify-center h-full gap-10">
      <div className="flex flex-col items-center justify-center gap-10 w-1/2">
        <div>
          <h1 className="text-2xl font-semibold">OTP 인증번호 입력</h1>
          <p>이메일로 발송된 인증번호를 입력해주세요.</p>
        </div>
        <Form className="w-3/4 space-y-10" method="post">
          <InputPair
            label="전화번호"
            name="phone"
            id="phone"
            placeholder="01012345678"
            type="number"
            required
            value={phone ?? ""}
          />
          <InputPair
            label="인증번호"
            name="otp"
            id="otp"
            placeholder="ex) 123456"
            type="number"
            required
          />
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
              "로그인"
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
}
