import { Form, useNavigation } from "react-router";
import { Hero } from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import { TEAM_STATUS } from "../constants";
import SelectPair from "~/common/components/select-pair";
import type { Route } from "./+types/create-team-page";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import z from "zod";
import { createTeam } from "../mutations";
import { redirect } from "react-router";
import { LoaderCircleIcon } from "lucide-react";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
};

export const formSchema = z.object({
  name: z.string().min(1),
  status: z.enum(TEAM_STATUS.map((status) => status.value)),
  size: z.coerce.number().min(1).max(100),
  position: z.string().min(1),
  introduction: z.string().min(1),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { data, error } = formSchema.safeParse(Object.fromEntries(formData));
  if (error) {
    return { formErrors: error.flatten().fieldErrors };
  }
  const { team_id } = await createTeam(client, data, userId);
  return redirect(`/teams/${team_id}`);
};

export default function CreateTeamPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="space-y-10">
      <Hero title="팀 생성" description="만들고 싶은 팀을 입력해주세요" />
      <Form className="flex flex-col max-w-5xl mx-auto gap-20" method="post">
        <div className="grid grid-cols-3 gap-10">
          <InputPair
            label="팀 이름"
            description="(20자 이내로 작성해주세요)"
            name="name"
            id="name"
            placeholder="팀 이름을 작성해주세요"
          />
          <SelectPair
            label="팀 상태"
            description="팀 상태를 선택해주세요"
            name="status"
            required
            placeholder="팀 상태를 선택해주세요"
            options={TEAM_STATUS.map((status) => ({
              label: status.label,
              value: status.value,
            }))}
          />
          <InputPair
            label="팀 규모"
            description="(1-100 이내로 숫자만 이력해주세요)"
            name="size"
            id="size"
            max={100}
            min={1}
            placeholder="ex) 1"
          />
          <InputPair
            label="모집 포지션"
            description="(20자 이내로 작성해주세요)"
            name="position"
            id="position"
            placeholder="ex) 디자이너, 엔지니어, PM"
          />
          <InputPair
            label="팀 소개"
            description="(500자 이내로 작성해주세요)"
            name="introduction"
            id="introduction"
            placeholder="팀 소개를 입력해주세요"
            textArea
          />
        </div>
        {actionData?.formErrors &&
          Object.entries(actionData.formErrors).map(([field, errors]) => (
            <p key={field} className="text-red-500">
              {errors?.join(", ")}
            </p>
          ))}
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : (
            "팀 등록하기"
          )}
        </Button>
      </Form>
    </div>
  );
}
