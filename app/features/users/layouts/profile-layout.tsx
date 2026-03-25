import {
  EditIcon,
  MessageCircleIcon,
  SettingsIcon,
  UserPlusIcon,
} from "lucide-react";
import { Form, Link, NavLink, Outlet } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/common/components/ui/dialog";
import { Textarea } from "~/common/components/ui/textarea";
import type { Route } from "./+types/profile-layout";
import { getUserProfile } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const user = await getUserProfile(client, params.nickname);
  return { user };
};

export default function ProfileLayout({ loaderData }: Route.ComponentProps) {
  const navigateOptions = [
    {
      label: "소개",
      url: `/users/${loaderData.user.nickname}`,
    },
    { label: "제품", url: `/users/${loaderData.user.nickname}/products` },
    { label: "게시글", url: `/users/${loaderData.user.nickname}/posts` },
  ];
  return (
    <div className="space-y-15">
      {/* 프로필 헤더 섹션*/}
      <div className="flex gap-10">
        {/* 아바타 이미지 섹션 */}
        <Avatar className="size-40">
          {loaderData.user.avatar ? (
            <AvatarImage src={loaderData.user.avatar} />
          ) : (
            <AvatarFallback className="text-2xl font-bold">{loaderData.user.name.charAt(0)}</AvatarFallback>
          )}
        </Avatar>
        {/* 프로필 정보 섹션 */}
        <div className="flex flex-col justify-center gap-3 w-full">
          <div className="flex gap-5">
            <h1 className="text-2xl font-semibold">{loaderData.user.name}</h1>
            {/* 팔로우 버튼 */}
            <Button variant="outline" className="gap-2">
              <UserPlusIcon className="size-4" />
              <span className="text-sm">팔로우</span>
            </Button>
            {/* DM 보내기 버튼 */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <MessageCircleIcon className="size-4" />
                  <span className="text-sm">DM</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>DM(Direct Message) 보내기</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  <span className="font-semibold block mb-3">to. userName</span>
                  <Form className="space-y-5">
                    <Textarea
                      name="message"
                      id="message"
                      placeholder="메시지를 입력해주세요"
                    />
                    <div className="flex justify-end">
                      <Button variant="default" type="submit" className="">
                        보내기
                      </Button>
                    </div>
                  </Form>
                </DialogDescription>
              </DialogContent>
            </Dialog>
            {/* 수정 버튼 */}
            <Button variant="outline" className="gap-2" asChild>
              <Link to="/my/settings">
                <EditIcon className="size-4" />
                <span className="text-sm">수정</span>
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">
              @{loaderData.user.nickname}
            </span>
            <Badge variant="secondary">{loaderData.user.position}</Badge>
            <Badge variant="secondary">0 팔로우</Badge>
            <Badge variant="secondary">0 팔로잉</Badge>
          </div>
        </div>
      </div>
      {/* 하위 컴포넌트 이동 버튼 섹션 */}
      <div className="flex gap-10">
        {navigateOptions.map((option) => (
          <Button variant="outline" asChild key={option.label}>
            <NavLink
              to={option.url}
              className={({ isActive }) =>
                isActive ? "bg-primary/50 text-primary-foreground" : ""
              }
            >
              {option.label}
            </NavLink>
          </Button>
        ))}
      </div>
      <div className="max-w-3xl">
        <Outlet context={{ user: loaderData.user }}/>
      </div>
    </div>
  );
}
