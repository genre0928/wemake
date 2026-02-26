import { Hero } from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";

export default function TeamPage() {
  const teamInfoDummyData = [
    { title: "팀 상태", value: "운영중" },
    { title: "팀 규모", value: "10명" },
    { title: "모집 포지션", value: "프론트엔드, 백엔드" },
    { title: "팀 소개", value: "팀 소개" },
  ];
  return (
    <div className="space-y-10">
      <Hero title="teamID 정보" description="팀 정보를 확인해보세요" />
      <div className="grid grid-cols-6 gap-40 items-start">
        {/* 컨텐츠 섹션 */}
        <div className="col-span-4">
          <div className="grid grid-cols-3 gap-10 items-start [&>*:last-child]:col-span-3">
            {teamInfoDummyData.map((data) => (
              <Card className="bg-transparent hover:bg-primary/10">
                <CardHeader>
                  <CardTitle>{data.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>{data.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        {/* 사이드바 섹션 */}
        <div className="flex flex-col col-span-2 border rounded-lg shadow-sm p-6 gap-5">
          <div className="text-2xl font-bold text-center">teamID 지원하기</div>
          <div className="space-y-5">
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>@nickname</div>
            </div>
            <div className="space-y-10">
              <InputPair
                label="지원 희망 포지션을 자성해주세요"
                name="position"
                id="position"
                placeholder="ex) 디자이너, 엔지니어, PM"
              />
              <InputPair
                label="지원 이유를 입력해주세요"
                description="(100자 이내로 작성해주세요)"
                name="reason"
                id="reason"
                placeholder="지원 이유를 입력해주세요"
                textArea
              />
            </div>
          </div>
          <Button className="w-full">지원하기</Button>
        </div>
      </div>
    </div>
  );
}
