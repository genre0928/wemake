import { Button } from "~/common/components/ui/button";
import { Badge } from "~/common/components/ui/badge";
import { DotIcon } from "lucide-react";

export default function JobPage() {
  return (
    <div>
      <div className="bg-linear-to-tr from-primary/80 to-primary/10 h-60 w-full rounded-lg"></div>
      <div className="grid grid-cols-6 -mt-20 gap-20 items-start">
        <div className="col-span-4 space-y-10">
          <div>
            <div className="size-40 bg-white rounded-full  overflow-hidden relative left-10">
              <img
                src="https://github.com/facebook.png"
                className="object-cover"
              />
            </div>
            <h1 className="text-4xl font-bold">Software Engineer</h1>
            <h4 className="text-lg text-muted-foreground">Meta Inc.</h4>
          </div>
          <div className="flex gap-2">
            <Badge variant={"secondary"}>Full-time</Badge>
            <Badge variant={"secondary"}>Remote</Badge>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Overview</h4>
            <p className="text-lg">
              This is a full-time remote position for a Software Engineer. We
              are looking for a skilled and experienced Software Engineer to
              join our team.
            </p>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Responsibilities</h4>
            <ul className="text-lg list-disc list-inside">
              {[
                "Design and implement scalable and efficient software solutions",
                "Collaborate with cross-functional teams to ensure timely delivery of projects",
                "Optimize software performance and troubleshoot issues",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Qualifications</h4>
            <ul className="text-lg list-disc list-inside">
              {[
                "Bachelor's degree in Computer Science or related field",
                "3+ years of experience in software development",
                "Strong proficiency in JavaScript, TypeScript, and React",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Benefits</h4>
            <ul className="text-lg list-disc list-inside">
              {[
                "Competitive salary",
                "Flexible working hours",
                "Opportunity to work on cutting-edge projects",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Skills</h4>
            <ul className="text-lg list-disc list-inside">
              {["JavaScript", "TypeScript", "React"].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-2 space-y-5 mt-32 sticky top-20 p-6 border rounded-lg">
          <div className="flex flex-col">
            <span className=" text-sm text-muted-foreground">급여</span>
            <span className="text-2xl font-medium">3,000만원 ~ 4,000만원</span>
          </div>
          <div className="flex flex-col">
            <span className=" text-sm text-muted-foreground">지역</span>
            <span className="text-2xl font-medium">원격근무</span>
          </div>
          <div className="flex flex-col">
            <span className=" text-sm text-muted-foreground">직업 유형</span>
            <span className="text-2xl font-medium">정규직</span>
          </div>
          <div className="flex">
            <span className=" text-sm text-muted-foreground">2일 전</span>
            <DotIcon className="size-4" />
            <span className=" text-sm text-muted-foreground">395 조회수</span>
          </div>
          <Button className="w-full">지원하기</Button>
        </div>
      </div>
    </div>
  );
}
