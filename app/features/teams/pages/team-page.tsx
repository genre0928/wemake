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
import type { Route } from "./+types/team-page";
import { getTeamById } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const team = await getTeamById(client, Number(params.teamId));
  if (!team) {
    throw new Error("Team not found");
  }
  return { team };
};

export default function TeamPage({ loaderData }: Route.ComponentProps) {
  const teamInfoDummyData = [
    { title: "팀 상태", value: loaderData.team.team_stage },
    { title: "팀 규모", value: loaderData.team.size },
    { title: "모집 포지션", value: loaderData.team.position },
    { title: "팀 소개", value: loaderData.team.description },
  ];
  return (
    <div>
      <Hero title={loaderData.team.name} description="팀 정보를 확인해보세요" />
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
          <div className="text-2xl font-bold text-center">
            {loaderData.team.name} 지원하기
          </div>
          <div className="space-y-5">
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src={loaderData.team.team_leader.avatar ?? ""} />
                <AvatarFallback>N</AvatarFallback>
              </Avatar>
              <div>@{loaderData.team.team_leader.name}</div>
            </div>
            <div className="space-y-10">
              <InputPair
                label="지원 희망 포지션을 작성해주세요"
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
