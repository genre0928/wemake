import { LoaderCircleIcon, StarHalf, Star as StarIcon } from "lucide-react";
import { useState } from "react";
import { Form, useActionData, useNavigation } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "~/common/components/ui/dialog";
import type { action } from "../pages/product-reviews-page";

const STAR_STEP = 0.5;

export default function CreateReviewDialog() {
  const [hoveredValue, setHoveredValue] = useState(0);
  const [rating, setRating] = useState(5);
  const displayValue = hoveredValue > 0 ? hoveredValue : rating;
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">리뷰 작성하기</DialogTitle>
      </DialogHeader>
      <Form className="space-y-5" method="post">
        {/* 별점 섹션 (0.5점 단위) */}
        <div className="flex gap-3">
          <div className="flex gap-0.5" onMouseLeave={() => setHoveredValue(0)}>
            {[1, 2, 3, 4, 5].map((star) => {
              const full = displayValue >= star;
              const half =
                displayValue >= star - STAR_STEP && displayValue < star;
              return (
                <div
                  key={star}
                  className="relative flex size-8 cursor-pointer items-center justify-center"
                >
                  {/* 별 표시: 꽉참 / 반쪽 / 비움(연한 윤곽만, 호버 시 나머지 별 윤곽 더 선명) */}
                  <div
                    className={`pointer-events-none flex items-center justify-center ${full || half ? "text-yellow-400" : displayValue > 0 ? "text-yellow-400/55" : "text-yellow-400/35"}`}
                  >
                    {full ? (
                      <StarIcon className="size-6" fill="currentColor" />
                    ) : half ? (
                      <StarHalf className="size-6" fill="currentColor" />
                    ) : (
                      <StarIcon
                        className="size-6 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.25}
                      />
                    )}
                  </div>
                  {/* 클릭/호버: 왼쪽 반 = star - 0.5, 오른쪽 반 = star */}
                  <div className="absolute inset-0 flex">
                    <label
                      className="flex-1 cursor-pointer"
                      onMouseEnter={() => setHoveredValue(star - STAR_STEP)}
                    >
                      <input
                        type="radio"
                        name="rating"
                        value={String(star - STAR_STEP)}
                        className="sr-only"
                        checked={rating === star - STAR_STEP}
                        onChange={() => setRating(star - STAR_STEP)}
                      />
                    </label>
                    <label
                      className="flex-1 cursor-pointer"
                      onMouseEnter={() => setHoveredValue(star)}
                    >
                      <input
                        type="radio"
                        name="rating"
                        value={String(star)}
                        className="sr-only"
                        checked={rating === star}
                        onChange={() => setRating(star)}
                      />
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
          {actionData?.formErrors?.rating && (
            <div className="text-red-500">{actionData.formErrors.rating}</div>
          )}
          <div className="flex flex-col text-sm text-muted-foreground">
            <span>제품의 별점을 매겨주세요 (0.5점 단위)</span>
            <span>(체크하지 않을 경우 5점으로 설정)</span>
          </div>
        </div>
        {/* 리뷰 내용 섹션 */}
        <InputPair
          textArea
          required
          name="review"
          id="review"
          placeholder="리뷰를 작성해주세요"
        />
        {actionData?.formErrors?.review && (
          <div className="text-red-500">{actionData.formErrors.review}</div>
        )}
        <DialogFooter>
          <Button type="submit">
            {isSubmitting ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              "리뷰 작성"
            )}
          </Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  );
}
