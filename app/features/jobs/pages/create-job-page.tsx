import { Form, redirect, useNavigation } from "react-router";
import { Hero } from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";
import { JOB_SALARY_TYPES, JOB_TYPES, WORK_TYPES } from "../constants";
import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/create-job-page";
import { getLoggedInUserId } from "~/features/users/queries";
import z from "zod";
import { createJob } from "../mutations";
import { LoaderCircleIcon } from "lucide-react";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
};

export const formSchema = z.object({
  position: z.string().min(1),
  overview: z.string().min(1),
  responsibilities: z.string().min(1),
  qualifications: z.string().min(1),
  preferredQualifications: z.string().min(1),
  skills: z.string().min(1),
  companyName: z.string().min(1),
  companyLogo: z.string().min(1),
  companyLocation: z.string().min(1),
  companyWebsite: z.string().min(1),
  employmentType: z.string().min(1),
  work: z.enum(WORK_TYPES.map((work) => work.value)),
  salary: z.enum(JOB_SALARY_TYPES.map((salary) => salary.value)),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) {
    return { formErrors: error.flatten().fieldErrors };
  }
  const {
    position,
    overview,
    responsibilities,
    qualifications,
    preferredQualifications,
    skills,
    companyName,
    companyLogo,
    companyLocation,
    companyWebsite,
    employmentType,
    work,
    salary,
  } = data;
  const { job_id } = await createJob(client, data);
  return redirect(`/jobs/${job_id}`);
};

export default function CreateJobPage() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="space-y-10">
      <Hero title="공고 등록" description="공고 등록 페이지" />
      <Form method="post" className="flex flex-col max-w-5xl mx-auto gap-20">
        <div className="grid grid-cols-3 gap-10">
          <InputPair
            label="포지션"
            description="(20자 이내로 작성해주세요)"
            name="position"
            id="position"
            placeholder="구인하고자 하는 포지션을 입력해주세요"
          />
          <InputPair
            label="개요"
            description="(100자 이내로 작성해주세요)"
            name="overview"
            id="overview"
            placeholder="공고의 개요를 입력해주세요"
            textArea
          />
          <InputPair
            label="직무 내용"
            description="(500자 이내로 작성해주세요)"
            name="responsibilities"
            id="responsibilities"
            placeholder="공고의 직무 내용을 입력해주세요"
            textArea
          />
          <InputPair
            label="자격 사항"
            description="(500자 이내로 작성해주세요)"
            name="qualifications"
            id="qualifications"
            placeholder="공고의 자격 사항을 입력해주세요"
            textArea
          />
          <InputPair
            label="우대 사항"
            description="(500자 이내로 작성해주세요)"
            name="preferredQualifications"
            id="preferredQualifications"
            placeholder="공고의 우대 사항을 입력해주세요"
            textArea
          />
          <InputPair
            label="기술 스택"
            description="(500자 이내로 작성해주세요)"
            name="skills"
            id="skills"
            placeholder="공고의 기술 스택을 입력해주세요"
            textArea
          />
          <InputPair
            label="회사명"
            description="(20자 이내로 작성해주세요)"
            name="companyName"
            id="companyName"
            placeholder="공고의 회사명을 입력해주세요"
          />
          <InputPair
            label="회사 로고"
            description="(500자 이내로 작성해주세요)"
            name="companyLogo"
            id="companyLogo"
            placeholder="공고의 회사 로고를 입력해주세요"
          />
          <InputPair
            label="회사 위치"
            description="(20자 이내로 작성해주세요)"
            name="companyLocation"
            id="companyLocation"
            placeholder="공고의 회사 위치를 입력해주세요"
          />
          <InputPair
            label="회사 웹사이트"
            description="공고의 회사 웹사이트를 입력해주세요"
            name="companyWebsite"
            id="companyWebsite"
            placeholder="https://example.com"
          />
          <SelectPair
            label="고용 형태"
            description="공고의 고용 형태를 선택해주세요"
            name="employmentType"
            placeholder="공고의 고용 형태를 선택해주세요"
            options={JOB_TYPES.map((type) => ({
              label: type.label,
              value: type.value,
            }))}
          />
          <SelectPair
            label="근무 형태"
            description="공고의 근무 형태를 선택해주세요"
            name="work"
            placeholder="공고의 근무 형태를 선택해주세요"
            options={WORK_TYPES.map((work) => ({
              label: work.label,
              value: work.value,
            }))}
          />
          <SelectPair
            label="급여"
            description="공고의 급여를 입력해주세요"
            name="salary"
            placeholder="공고의 급여를 입력해주세요"
            options={JOB_SALARY_TYPES.map((salary) => ({
              label: salary.label,
              value: salary.value,
            }))}
          />
        </div>
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? <LoaderCircleIcon className="animate-spin" /> : "공고 등록하기"}
        </Button>
      </Form>
    </div>
  );
}
