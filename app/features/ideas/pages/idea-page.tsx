import { Hero } from "~/common/components/hero";
import { IdeaCard } from "../components/idea-card";
import type { Route } from "./+types/idea-page";
import { useParams } from "react-router";
import { DotIcon, EyeIcon, HeartIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";

export default function IdeaPage() {
  const { ideaId } = useParams();
  return (
    <div className="space-y-10">
      <Hero
        title={ideaId ?? "아이디어 정보를 가져오는 중입니다."}
        description={ideaId ? "아이디어 설명" : "아이디어 페이지"}
      />
      <div className="flex flex-col items-center mx-auto gap-10">
        <div>아이디어 상세 설명 섹션</div>
        <div className="flex gap-10">
          <div className="flex items-center gap-1 text-sm leading-tight">
            <EyeIcon className="size-4" />
            <span>10</span>
            <DotIcon className="size-4" />
            <span>12시간 전</span>
          </div>
          <div className="flex items-center gap-1 text-sm leading-tight">
            <HeartIcon className="size-4" />
            <span>10</span>
          </div>
        </div>
        <div>
          <Button>아이디어 구매하기 &rarr;</Button>
        </div>
      </div>
    </div>
  );
}
