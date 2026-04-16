import { Button } from "~/common/components/ui/button";
import { Badge } from "~/common/components/ui/badge";
import { DotIcon } from "lucide-react";
import type { Route } from "./+types/job-page";
import { getJobById } from "../queries";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const job = await getJobById(client, Number(params.jobId));
  if (!job) {
    throw new Error("Job not found");
  }
  return { job };
};

export default function JobPage({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <div className="bg-linear-to-tr from-primary/80 to-primary/10 h-60 w-full rounded-lg"></div>
      <div className="grid grid-cols-6 -mt-20 gap-20 items-start">
        <div className="col-span-4 space-y-10">
          <div className="space-y-5">
            <div className="size-40 bg-white rounded-full  overflow-hidden relative left-10">
              <img src={loaderData.job.company_logo} className="object-cover" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">{loaderData.job.position}</h1>
              <h4 className="text-lg text-muted-foreground">
                {loaderData.job.company_name}
              </h4>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant={"secondary"}>{loaderData.job.job_type}</Badge>
            <Badge variant={"secondary"}>{loaderData.job.work_type}</Badge>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">직무 소개</h4>
            <p className="text-lg">{loaderData.job.overview}</p>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">책임</h4>
            <ul className="text-lg list-disc list-inside">
              {loaderData.job.responsibilities
                .split("\n")
                .map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">자격 사항</h4>
            <ul className="text-lg list-disc list-inside">
              {loaderData.job.qualifications
                .split("\n")
                .map((qualification) => (
                  <li key={qualification}>{qualification}</li>
                ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">우대 사항</h4>
            <ul className="text-lg list-disc list-inside">
              {loaderData.job.preferred_qualifications
                .split("\n")
                .map((preferred_qualification) => (
                  <li key={preferred_qualification}>
                    {preferred_qualification}
                  </li>
                ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">기술 스택</h4>
            <ul className="text-lg list-disc list-inside">
              {loaderData.job.skills.split("\n").map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-2 space-y-5 mt-32 sticky top-20 p-6 border rounded-lg">
          <div className="flex flex-col">
            <span className=" text-sm text-muted-foreground">급여</span>
            <span className="text-2xl font-medium">
              {loaderData.job.salary} 만원
            </span>
          </div>
          <div className="flex flex-col">
            <span className=" text-sm text-muted-foreground">근무 지역</span>
            <span className="text-2xl font-medium">
              {loaderData.job.company_location}
            </span>
          </div>
          <div className="flex flex-col">
            <span className=" text-sm text-muted-foreground">직업 유형</span>
            <span className="text-2xl font-medium">
              {loaderData.job.job_type}
            </span>
          </div>
          <div className="flex">
            <span className=" text-sm text-muted-foreground">
              {DateTime.fromISO(loaderData.job.created_at).toRelative()}
            </span>
            <DotIcon className="size-4" />
            <span className=" text-sm text-muted-foreground">조회수 0</span>
          </div>
          <Button className="w-full">지원하기</Button>
        </div>
      </div>
    </div>
  );
}
