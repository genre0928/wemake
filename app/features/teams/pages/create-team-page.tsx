import { Form } from "react-router";
import { Hero } from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import { TEAM_STATUS } from "../constants";
import SelectPair from "~/common/components/select-pair";

export default function CreateTeamPage() {
  return (
    <div className="space-y-10">
      <Hero title="팀 생성" description="만들고 싶은 팀을 입력해주세요" />
      <Form className="flex flex-col max-w-5xl mx-auto gap-20">
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
        <Button className="w-full" type="submit">
          팀 등록하기
        </Button>
      </Form>
    </div>
  );
}
