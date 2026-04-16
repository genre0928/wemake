import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { POSITIONS_OPTIONS } from "../constants";
import { useState } from "react";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import { Form, redirect, useFetcher, useNavigation } from "react-router";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId, getUserById } from "../queries";
import type { Route } from "./+types/settings-page";
import z from "zod";
import { updateUser, updateUserAvatar } from "../mutations";
import { LoaderCircleIcon } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "~/common/components/ui/alert";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const user = await getUserById(client, { id: userId });
  return { user };
};

const formSchema = z.object({
  nickname: z.string().min(1),
  position: z.string().min(1),
  avatar: z.instanceof(File),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const avatar = formData.get("avatar") as File;
  if (avatar && avatar instanceof File) {
    // 아바타 업로드 로직 추가
    if (avatar.size <= 2 * 1024 * 1024 && avatar.type.startsWith("image/")) {
      const { data, error } = await client.storage
        .from("avatars")
        .upload(`${userId}/${Date.now()}`, avatar, {
          contentType: avatar.type,
          upsert: false,
        });
      if (error) {
        return {
          formErrors: {
            avatar: [error.message],
          },
        };
      }
      const {
        data: { publicUrl },
      } = await client.storage.from("avatars").getPublicUrl(data.path);
      await updateUserAvatar(client, { id: userId, avatarUrl: publicUrl });
    } else {
      return {
        formErrors: {
          avatar: ["이미지 파일의 크기 또는 형식이 올바르지 않습니다."],
        },
      };
    }
  } else {
    const { success, data, error } = formSchema.safeParse(
      Object.fromEntries(formData),
    );
    if (!success) {
      return { formErrors: error.flatten().fieldErrors };
    }
    const { nickname, position } = data;
    await updateUser(client, {
      id: userId,
      nickname,
      position: position as
        | "frontend"
        | "backend"
        | "designer"
        | "marketer"
        | "planner"
        | "etc",
    });
    return { success: true };
  }
};

export default function SettingsPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  // 수정하기
  const [image, setImage] = useState<string | null>(
    loaderData.user?.avatar ?? null,
  );
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const avatarUrl = URL.createObjectURL(file);
      setImage(avatarUrl);
    }
  };
  const profileFetcher = useFetcher();
  const avatarFetcher = useFetcher();
  const isProfileSubmitting = profileFetcher.state !== "idle";
  const isAvatarSubmitting = avatarFetcher.state !== "idle";
  return (
    <div className="space-y-20">
      {actionData?.success && (
        <Alert>
          <AlertTitle>프로필 변경 완료 알림</AlertTitle>
          <AlertDescription>
            닉네임 정보가 변경되었습니다. 확인 후 이용해주세요.
          </AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-6 items-start gap-40">
        {/* 유저정보 설정 섹션 */}
        <div className="col-span-4 flex flex-col gap-10">
          <h2 className="text-2xl font-bold">나의 프로필 수정</h2>
          <profileFetcher.Form className="space-y-10" method="post">
            <InputPair
              label="이름"
              name="name"
              id="name"
              placeholder="이름"
              disabled
              defaultValue={loaderData.user?.name}
            />
            <InputPair
              label="이메일"
              name="email"
              id="email"
              placeholder="example@example.com"
              disabled
              defaultValue={loaderData.user?.email}
            />
            <InputPair
              label="닉네임"
              name="nickname"
              id="nickname"
              placeholder="닉네임"
              defaultValue={loaderData.user?.nickname}
            />
            <SelectPair
              label="포지션"
              name="position"
              required
              placeholder="포지션 선택"
              options={POSITIONS_OPTIONS.map((option) => ({
                label: option.label,
                value: option.value,
              }))}
              defaultValue={loaderData.user?.position}
            />
            <Button
              variant="default"
              type="submit"
              className="w-full"
              disabled={isProfileSubmitting}
            >
              {isProfileSubmitting ? (
                <LoaderCircleIcon className="animate-spin" />
              ) : (
                "프로필 저장"
              )}
            </Button>
          </profileFetcher.Form>
        </div>
        {/* 아바타 설정 섹션 */}
        <avatarFetcher.Form
          className="col-span-2 border rounded-lg shadow-sm p-6 h-full space-y-10"
          method="post"
          encType="multipart/form-data"
        >
          <span className="text-lg font-bold text-center block">
            아바타 이미지 수정
          </span>
          <div className="w-full max-w-40 aspect-square rounded-full shadow-xl border mx-auto overflow-hidden flex items-center justify-center bg-muted/50">
            <img
              src={image ?? "/images/avatar.png"}
              alt="아바타 이미지"
              className="size-full object-contain"
            />
          </div>

          <div className="space-y-2">
            <Input type="file" id="avatar" name="avatar" onChange={onChange} />
            <div className="flex flex-col gap-0.5 text-muted-foreground text-xs mb-5">
              <span>아바타 사이즈 : 40px x 40px</span>
              <span>파일 크기 : 2MB 이하</span>
              <span>파일 형식 : PNG, JPG, JPEG</span>
            </div>
          </div>
          {actionData?.formErrors?.avatar && (
            <Alert>
              <AlertTitle>아바타 이미지 업로드 오류</AlertTitle>
              <AlertDescription>
                {actionData.formErrors.avatar.join(", ")}
              </AlertDescription>
            </Alert>
          )}
          <Button
            variant="default"
            type="submit"
            className="w-full"
            disabled={isAvatarSubmitting}
          >
            {isAvatarSubmitting ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              "아바타 이미지 업로드"
            )}
          </Button>
        </avatarFetcher.Form>
      </div>
    </div>
  );
}
