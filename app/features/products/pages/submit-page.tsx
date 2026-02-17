import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-page";
import { Form } from "react-router";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { useState } from "react";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "제품 제출 | Wemake" },
    { name: "description", content: "제품 제출 페이지" },
  ];
};

export default function SubmitPage() {
  const [image, setImage] = useState<File | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };
  return (
    <div className="space-y-20">
      <Hero title="제품 제출" description="제품 제출 페이지" />
      <Form className="flex flex-col max-w-5xl mx-auto gap-20">
        <div className="flex gap-10">
          <div className="flex flex-col gap-7">
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
          <div className="flex flex-col gap-2">
            <Label htmlFor="image" className="flex flex-col gap-1 items-start">
              <div>제품 이미지</div>
              <small className="text-muted-foreground">
                제품의 이미지를 업로드해주세요
              </small>
            </Label>
            <Input type="file" id="image" name="image" onChange={onChange} />
            <div className="flex flex-col gap-0.5 text-muted-foreground text-xs mb-5">
              <span>제품 사이즈 : 100px x 100px</span>
              <span>제품 파일 크기 : 1MB 이하</span>
              <span>제품 파일 형식 : PNG, JPG, JPEG</span>
            </div>
            {image ? (
              <div className="size-64 rounded-xl shadow-xl border-2 flex items-center justify-center">
                <img
                  src={URL.createObjectURL(image)}
                  alt="제품 이미지"
                  className="size-full object-cover"
                />
              </div>
            ) : null}
          </div>
        </div>
        <Button
          variant="default"
          type="submit"
          className="min-h-12 text-lg font-bold"
        >
          제품 제출
        </Button>
      </Form>
    </div>
  );
}
