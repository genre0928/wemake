import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-page";
import { Form } from "react-router";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "제품 제출 | Wemake" },
    { name: "description", content: "제품 제출 페이지" },
  ];
};

export default function SubmitPage() {
  return (
    <div className="space-y-20">
      <Hero title="제품 제출" description="제품 제출 페이지" />
      <Form>
        <div className="flex flex-col gap-7 max-w-2xl mx-auto">
          <InputPair
            label="제품 이름"
            description="제품의 이름을 작성해주세요"
            name="name"
            id="name"
            placeholder="제품 이름"
          />
          <InputPair
            label="제품 태그"
            description="제품의 태그는 쉼표로 구분해주세요"
            name="tags"
            id="tags"
            placeholder="태그1, 태그2, 태그3, ..."
          />
          <InputPair
            label="제품 URL"
            description="제품의 URL을 작성해주세요"
            name="url"
            id="url"
            placeholder="https://example.com"
          />
          <InputPair
            label="제품 설명"
            description="제품의 설명을 작성해주세요"
            name="description"
            id="description"
            placeholder="제품 설명"
            textArea
          />
          <SelectPair
            label="제품 카테고리"
            description="해당하는 제품의 카테고리를 선택해주세요"
            name="category"
            required
            placeholder="Select a category"
            options={[
              { label: "AI", value: "ai" },
              { label: "Design", value: "design" },
              { label: "Marketing", value: "marketing" },
              { label: "Development", value: "development" },
            ]}
          />
        </div>
      </Form>
    </div>
  );
}
