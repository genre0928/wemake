import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/promotion-page";
import { Form } from "react-router";
import SelectPair from "~/common/components/select-pair";
import { Calendar } from "~/common/components/ui/calendar";
import { Label } from "~/common/components/ui/label";
import type { DateRange } from "react-day-picker";
import { useEffect, useRef, useState } from "react";
import { differenceInDays } from "date-fns";
import { DateTime } from "luxon";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import {
  getLoggedInUserId,
  getUserProductsByUserId,
} from "~/features/users/queries";
import {
  loadTossPayments,
  type TossPaymentsWidgets,
} from "@tosspayments/tosspayments-sdk";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "제품 홍보 | Wemake" },
    { name: "description", content: "제품 홍보 페이지" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const products = await getUserProductsByUserId(client, userId);
  return { userId, products };
};

export default function PromotionPage({ loaderData }: Route.ComponentProps) {
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
  const widgets = useRef<TossPaymentsWidgets | null>(null);
  const initedToss = useRef<boolean>(false);
  useEffect(() => {
    const initToss = async () => {
      const toss = loadTossPayments("test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm");
      if (initedToss.current) return;
      initedToss.current = true;
      widgets.current = (await toss).widgets({
        customerKey: loaderData.userId,
      });
      widgets.current.setAmount({
        value: 0,
        currency: "KRW",
      });
      await widgets.current.renderPaymentMethods({
        selector: "#toss-payment-methods",
      });
      await widgets.current.renderAgreement({
        selector: "#toss-payment-agreement",
      });
    };
    initToss();
  }, []);
  useEffect(() => {
    const updateAmount = async () => {
      if (widgets.current) {
        await widgets.current.setAmount({
          value: totalDays * 1000,
          currency: "KRW",
        });
      }
    };
    updateAmount();
  }, [promotionPeriod]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const product = formData.get("product") as string;
    if (!product || !promotionPeriod?.to || !promotionPeriod?.from) return;
    await widgets.current?.requestPayment({
      orderId: crypto.randomUUID(),
      orderName: `${product} 홍보 프로모션`,
      metadata: {
        product,
        promotionFrom: DateTime.fromJSDate(promotionPeriod.from).toISO(),
        promotionTo: DateTime.fromJSDate(promotionPeriod.to).toISO(),
      },
      successUrl : `${window.location.href}/success`,
      failUrl : `${window.location.href}/fail`,
    });
  };
  return (
    <div className="space-y-20">
      <Hero title="제품 홍보" description="제품 홍보 페이지" />
      <form className="grid grid-cols-6 gap-10" onSubmit={handleSubmit}>
        <div className="col-span-3 flex flex-col gap-10 max-w-5xl mx-auto">
          <SelectPair
            required
            label="제품 이름"
            description="제품 이름"
            name="product"
            placeholder="프로모션을 적용할 제품의 ID를 선택해주세요"
            options={loaderData.products.map((product) => ({
              label: product.name,
              value: product.name,
            }))}
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
          </div>
        </div>
        <aside className="col-span-3 px-20 flex flex-col items-center gap-y-10">
          <div id="toss-payment-methods" className="w-full" />
          <div id="toss-payment-agreement" className="w-full" />
          <Button className="w-3/4" disabled={totalDays < 3}>
            {`${totalDays * 1000} 원`} 결제하기
          </Button>
        </aside>
      </form>
    </div>
  );
}
