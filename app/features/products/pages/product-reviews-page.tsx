import { Button } from "~/common/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/common/components/ui/dialog";
import { ReviewCard } from "~/features/products/components/review-card";
import CreateReviewDialog from "../components/create-review-dialog";
import type { Route } from "./+types/product-reviews-page";
import { useOutletContext } from "react-router";
import { getReviews } from "../queries";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { z } from "zod";
import { createReview } from "../mutations";
import { useEffect, useState } from "react";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const reviews = await getReviews(client, Number(params.productId));
  return { reviews };
};

const formSchema = z.object({
  rating: z.coerce.number().min(0).max(5),
  review: z.string().min(1),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) {
    return { formErrors: error.flatten().fieldErrors };
  }
  const { rating, review } = data;
  await createReview(client, {
    product_id: Number(params.productId),
    profile_id: userId,
    rating,
    review,
  });
  return { success: true };
};

export default function ProductReviewsPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { reviews } = useOutletContext<{ reviews: number }>();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (actionData?.success) {
      setOpen(false);
    }
  }, [actionData]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="max-w-1/2 space-y-5">
        {/* 리뷰 총 갯수와 리뷰 작성하기 섹션 */}
        <div className="flex justify-between items-center">
          <h2>{reviews}개의 리뷰</h2>
          <DialogTrigger>
            <Button variant="secondary">리뷰 작성하기</Button>
          </DialogTrigger>
        </div>
        {/* 작성된 리뷰 섹션 */}
        <div className="space-y-20">
          {loaderData.reviews.map((review) => (
            <ReviewCard
              key={review.review_id}
              avatarSrc={review.profiles.avatar ?? ""}
              displayName={review.profiles.name}
              username={review.profiles.nickname}
              rating={review.rating}
              content={review.review}
              dateText={DateTime.fromISO(review.created_at)}
              showActions
            />
          ))}
        </div>
        {/* 리뷰 작성하기 다이얼로그 섹션 */}
        <CreateReviewDialog />
      </div>
    </Dialog>
  );
}
