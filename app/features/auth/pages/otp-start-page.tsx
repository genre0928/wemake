import InputPair from "~/common/components/input-pair";

import { Button } from "~/common/components/ui/button";
import { Form, redirect, useNavigate, useNavigation } from "react-router";
import type { Route } from "./+types/otp-start-page";
import z from "zod";
import { makeSSRClient } from "~/supa-client";
import { LoaderCircleIcon } from "lucide-react";

const formSchema = z.object({
  phone: z.string(),
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
  const { phone } = data;
  const { client, headers } = makeSSRClient(request);
  const { error: otpError } = await client.auth.signInWithOtp({
    phone,
    options: {
      shouldCreateUser: true,
    },
  });
  if (otpError) {
    return {
      error: otpError.message,
    };
  }
  return redirect(`/auth/otp/complete?phone=${phone}`, { headers: headers });
};
export default function OtpStartPage({actionData} : Route.ComponentProps) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="flex flex-col items-center justify-center h-full gap-10">
      <div className="flex flex-col items-center justify-center gap-10 w-1/2">
        <div>
          <h1 className="text-2xl font-semibold">OTP 로그인</h1>
          <p>이메일로 인증 코드를 발송합니다.</p>
        </div>
        <Form className="w-3/4 space-y-10" method="post">
          <InputPair
            label="전화번호"
            name="phone"
            id="phone"
            placeholder="01012345678"
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
              "인증 코드 발송"
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
}
