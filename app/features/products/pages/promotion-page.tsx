import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/promotion-page";
import { Form } from "react-router";
import SelectPair from "~/common/components/select-pair";
import { Calendar } from "~/common/components/ui/calendar";
import { Label } from "~/common/components/ui/label";
import type { DateRange } from "react-day-picker";
import { useState } from "react";
import { differenceInDays } from "date-fns";
import { DateTime } from "luxon";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "제품 홍보 | Wemake" },
    { name: "description", content: "제품 홍보 페이지" },
  ];
};

export default function PromotionPage() {
  const [promotionPeriod, setPromotionPeriod] = useState<
    DateRange | undefined
  >();
  const totalDays =
    promotionPeriod?.from && promotionPeriod?.to
      ? Math.abs(
          DateTime.fromJSDate(promotionPeriod.from).diff(
            DateTime.fromJSDate(promotionPeriod.to),
            "days",
          ).days,
        ) + 1
      : 0;
  return (
    <div className="space-y-20">
      <Hero title="제품 홍보" description="제품 홍보 페이지" />
      <Form className="flex flex-col gap-10 max-w-5xl mx-auto items-center">
        <SelectPair
          label="제품 이름"
          description="제품 이름"
          name="name"
          placeholder="프로모션을 적용할 제품의 ID를 선택해주세요"
          options={[
            { label: "제품 1", value: "product1" },
            { label: "제품 2", value: "product2" },
            { label: "제품 3", value: "product3" },
          ]}
        />
        <div className="flex flex-col gap-3 items-center">
          <div>
            <Label>홍보 기간을 선택해주세요</Label>
            <small className="text-muted-foreground">
              홍보 기간은 최소 3일 이상이어야 합니다
            </small>
          </div>
          <Calendar
            mode="range"
            selected={promotionPeriod}
            onSelect={setPromotionPeriod}
            min={3}
            disabled={{ before: new Date() }}
          />
          <Button className="w-3/4" disabled={totalDays < 3}>
            {`${totalDays * 1000} 원`} 결제하기
          </Button>
        </div>
      </Form>
    </div>
  );
}
