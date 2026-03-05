// 제품 데이터를 가져오기 위한 ORM 작성 파일

import type { DateTime } from "luxon";
import db from "~/index";
import client from "~/supa-client";

export const getProducts = async () => {
  const { data, error } = await client.from("product_list_view").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getProductsByDateRange = async ({
  startDate,
  endDate,
  limit,
}: {
  startDate: DateTime;
  endDate: DateTime;
  limit: number;
}) => {
  const { data, error } = await client
    .from("products")
    .select(
      `
        product_id,
        name,
        description,
        stats,
        upvotes,
        created_at
        `,
    )
    .order("upvotes", { ascending: false })
    .gte("created_at", startDate)
    .lte("created_at", endDate)
    .limit(limit);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};
