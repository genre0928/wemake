import {
  createBrowserClient,
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";
import type { Database as SupabaseDatabase } from "../database.types";
import type { MergeDeep, SetNonNullable } from "type-fest";
import { createClient } from "@supabase/supabase-js";

export type Database = MergeDeep<
  SupabaseDatabase,
  {
    public: {
      Views: {
        messages_view: {
          Row: SetNonNullable<
            SupabaseDatabase["public"]["Views"]["messages_view"]["Row"]
          >;
        };
        community_post_list_view: {
          Row: SetNonNullable<
            SupabaseDatabase["public"]["Views"]["community_post_list_view"]["Row"]
          >;
        };
        idea_list_view: {
          Row: SetNonNullable<
            SupabaseDatabase["public"]["Views"]["idea_list_view"]["Row"]
          >;
        };
        product_overview_view: {
          Row: SetNonNullable<
            SupabaseDatabase["public"]["Views"]["product_overview_view"]["Row"]
          >;
        };
        community_post_detail_view: {
          Row: SetNonNullable<
            SupabaseDatabase["public"]["Views"]["community_post_detail_view"]["Row"]
          >;
        };
      };
    };
  }
>;

// createClient에서 쿠키 정보 수정이 가능한 브라우저 클라이언트를 createBrowserClient로 생성
export const browserClient = createBrowserClient<Database>(
  "https://abwnuiykpzvhpquyrndi.supabase.co",
  "sb_publishable_szy5LscIQ0d0dcmKwrA52w_4R3iiUnO",
);

export const makeSSRClient = (request: Request) => {
  const headers = new Headers();
  const serverSideClient = createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!,
    {
      cookies: {
        getAll() {
          const cookies = parseCookieHeader(
            request.headers.get("Cookie") ?? "",
          );

          return cookies.map(({ name, value }) => ({
            name,
            value: value ?? "",
          }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            headers.append(
              "Set-Cookie",
              serializeCookieHeader(name, value, options),
            );
          });
        },
      },
    },
  );
  return { client: serverSideClient, headers };
};

export const adminClient = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!,
)