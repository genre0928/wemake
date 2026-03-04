import { createClient } from "@supabase/supabase-js";
import type { Database } from "../database.types";
import type { MergeDeep, SetNonNullable } from "type-fest";

const client = createClient<
  MergeDeep<
    Database,
    {
      public: {
        views: {
          community_post_list_view: {
            Row: SetNonNullable<
              Database["public"]["Views"]["community_post_list_view"]["Row"]
            >;
          };
          product_list_view: {
            Row: SetNonNullable<
              Database["public"]["Views"]["product_list_view"]["Row"]
            >;
          };
        };
      };
    }
  >
>(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export default client;
