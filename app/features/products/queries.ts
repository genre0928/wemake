// 제품 데이터를 가져오기 위한 ORM 작성 파일

import client from "~/supa-client";

export const getProducts = async () => {
  const { data, error } = await client.from("product_list_view").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
