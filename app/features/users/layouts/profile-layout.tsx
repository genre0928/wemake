import { EditIcon, MessageCircleIcon, SettingsIcon } from "lucide-react";
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

export default function ProfileLayout() {
  const navigateOptions = [
    {
      label: "소개",
      url: "/my/users/userId",
    },
    { label: "제품", url: "/my/users/userId/products" },
    { label: "게시글", url: "/my/users/userId/posts" },
  ];
  return (
    <div className="space-y-15">
      {/* 프로필 헤더 섹션*/}
      <div className="flex gap-10">
        {/* 아바타 이미지 섹션 */}
        <Avatar className="size-40">
          <AvatarImage src="https://github.com/genre0928.png" />
          <AvatarFallback>N</AvatarFallback>
        </Avatar>
        {/* 프로필 정보 섹션 */}
        <div className="flex flex-col justify-center gap-3 w-full">
          <div className="flex gap-5">
            <h1 className="text-2xl font-semibold">userName</h1>
            <Button variant="outline" className="gap-2" asChild>
              <Link to="/my/settings">
                <EditIcon className="size-4" />
                <span className="text-sm">수정</span>
              </Link>
            </Button>
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
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">@userId</span>
            <Badge variant="outline">포지션</Badge>
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
        <Outlet />
      </div>
    </div>
  );
}
