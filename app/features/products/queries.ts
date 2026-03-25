// 제품 데이터를 가져오기 위한 ORM 작성 파일

import type { DateTime } from "luxon";
import { PAGE_SIZE } from "./constants";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const productListSelect = `
  product_id,
  name,
  description,
  upvotes:stats->>upvotes,
  reviews:stats->>reviews,
  views:stats->>views,
  created_at
`;

export const getProductsByDateRange = async (client: SupabaseClient<Database>, {
  startDate,
  endDate,
  limit,
  page = 1,
}: {
  startDate: DateTime;
  endDate: DateTime;
  limit: number;
  page?: number;
}) => {
  const { data, error } = await client
    .from("products")
    .select(productListSelect)
    .order("stats->>upvotes", { ascending: false })
    .gte("created_at", startDate)
    .lte("created_at", endDate)
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// 기간동안 products 개수 조회 함수
export const getProductPagesByDateRange = async (client: SupabaseClient<Database>, {
  startDate,
  endDate,
}: {
  startDate: DateTime;
  endDate: DateTime;
}) => {
  const { count, error } = await client
    .from("products")
    .select(`product_id`, { count: "exact", head: true })
    .gte("created_at", startDate)
    .lte("created_at", endDate);
  if (error) {
    throw new Error(error.message);
  }
  if (!count) return 1;

  return Math.ceil(count / PAGE_SIZE);
};

export const getCategories = async (client: SupabaseClient<Database>) => {
  const { data, error } = await client.from("categories").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getCategoryById = async (client: SupabaseClient<Database>, categoryId: number) => {
  const { data, error } = await client
    .from("categories")
    .select("*")
    .eq("category_id", categoryId)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getProductsByCategoryId = async (client: SupabaseClient<Database>, {
  categoryId,
  page,
}: {
  categoryId: number;
  page: number;
}) => {
  const { data, error } = await client
    .from("products")
    .select(productListSelect)
    .eq("category_id", categoryId)
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getProductPagesByCategoryId = async (client: SupabaseClient<Database>, {
  categoryId,
  page,
}: {
  categoryId: number;
  page: number;
}) => {
  const { count, error } = await client
    .from("products")
    .select("product_id", { count: "exact", head: true })
    .eq("category_id", categoryId)
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
  if (error) {
    throw new Error(error.message);
  }
  if (!count) return 1;
  return Math.ceil(count / PAGE_SIZE);
};

export const getProductBySearch = async (client: SupabaseClient<Database>, {
  query,
  page,
}: {
  query: string;
  page: number;
}) => {
  const { data, error } = await client
    .from("products")
    .select(productListSelect)
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getProductById = async (client: SupabaseClient<Database>, productId: number) => {
  const { data, error } = await client
    .from("product_overview_view")
    .select("*")
    .eq("product_id", productId)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getReviews = async (client: SupabaseClient<Database>, productId: number) => {
  const { data, error } = await client
    .from("reviews")
    .select(
      `
        *,
        profiles(*)
        `,
    )
    .eq("product_id", productId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
