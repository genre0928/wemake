import { Form } from "react-router";
import { Hero } from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { COMMUNITY_POST_CATEGORIES } from "../constants";
import { Button } from "~/common/components/ui/button";

export default function CreatePostPage() {
  return (
    <div className="space-y-10">
      <Hero title="포스트제목" description="포스트 설명" />
      <Form className="space-y-20 max-w-2xl mx-auto">
        <div className="space-y-5">
          <InputPair
            label="제목"
            description="제목을 입력해주세요"
            name="title"
            id="title"
            placeholder="제목"
          />
          <SelectPair
            label="카테고리"
            description="카테고리를 선택해주세요"
            name="category"
            placeholder="카테고리"
            options={COMMUNITY_POST_CATEGORIES.map((category) => ({
              label: category.label,
              value: category.value,
            }))}
          />
          <InputPair
            label="내용"
            description="내용을 입력해주세요"
            name="content"
            id="content"
            placeholder="내용"
            textArea
          />
        </div>
        <Button className="w-full" type="submit">
          작성하기
        </Button>
      </Form>
    </div>
  );
}
