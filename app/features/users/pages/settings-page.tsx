import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { POSITIONS_OPTIONS } from "../constants";
import { useState } from "react";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import { Form } from "react-router";

export default function SettingsPage() {
  const [image, setImage] = useState<File | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };
  return (
    <div className="space-y-20">
      <div className="grid grid-cols-6 items-start gap-40">
        {/* 유저정보 설정 섹션 */}
        <div className="col-span-4 flex flex-col gap-10">
          <h2 className="text-2xl font-bold">나의 프로필 수정</h2>
          <Form className="space-y-15">
            <InputPair
              label="아이디"
              name="id"
              id="id"
              placeholder="userID"
              disabled
            />
            <InputPair
              label="닉네임"
              name="nickname"
              id="nickname"
              placeholder="닉네임"
            />
            <SelectPair
              label="포지션"
              name="position"
              required
              placeholder="포지션 선택"
              options={POSITIONS_OPTIONS.map((option) => ({
                label: option.label,
                value: option.value,
              }))}
            />
            <Button variant="default" type="submit" className="w-full">
              프로필 저장
            </Button>
          </Form>
        </div>
        {/* 아바타 설정 섹션 */}
        <div className="col-span-2 border rounded-lg shadow-sm p-6 h-full space-y-10">
          <span className="text-lg font-bold text-center block">
            아바타 이미지 수정
          </span>
          <div className="w-full max-w-40 aspect-square rounded-full shadow-xl border mx-auto overflow-hidden flex items-center justify-center bg-muted/50">
            <img
              src={image ? URL.createObjectURL(image) : "/images/avatar.png"}
              alt="아바타 이미지"
              className="size-full object-contain"
            />
          </div>

          <div className="space-y-2">
            <Input type="file" id="image" name="image" onChange={onChange} />
            <div className="flex flex-col gap-0.5 text-muted-foreground text-xs mb-5">
              <span>아바타 사이즈 : 40px x 40px</span>
              <span>제품 파일 크기 : 1MB 이하</span>
              <span>제품 파일 형식 : PNG, JPG, JPEG</span>
            </div>
          </div>
          <Button variant="default" type="button" className="w-full">
            아바타 이미지 업로드
          </Button>
        </div>
      </div>
    </div>
  );
}
