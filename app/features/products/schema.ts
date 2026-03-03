import {
  bigint,
  check,
  jsonb,
  pgTable,
  primaryKey,
  real,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { profiles } from "../users/schema";
import { sql } from "drizzle-orm";

export const products = pgTable("products", {
  product_id: bigint({ mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  name: text().notNull(),
  tags: text().array().notNull(),
  icon: text().notNull(),
  url: text().notNull(),
  description: text().notNull(),
  stats: jsonb().notNull().default({ views: 0, reviews: 0 }),
  profile_id: uuid().references(() => profiles.profile_id, {
    onDelete: "cascade",
  }),
  category_id: bigint({ mode: "number" }).references(
    () => categories.category_id,
  ),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});

export const categories = pgTable("categories", {
  category_id: bigint({ mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  name: text().notNull(),
  description: text().notNull(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});

export const product_likes = pgTable(
  "product_likes",
  {
    product_id: bigint({ mode: "number" }).references(
      () => products.product_id,
      {
        onDelete: "cascade",
      },
    ),
    profile_id: uuid().references(() => profiles.profile_id, {
      onDelete: "cascade",
    }),
  },
  (table) => [primaryKey({ columns: [table.product_id, table.profile_id] })],
);

export const reviews = pgTable(
  "reviews",
  {
    review_id: bigint({ mode: "number" })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    product_id: bigint({ mode: "number" }).references(
      () => products.product_id,
      {
        onDelete: "cascade",
      },
    ),
    profile_id: uuid().references(() => profiles.profile_id, {
      onDelete: "cascade",
    }),
    rating: real().notNull(),
    review: text().notNull(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
  },
  (table) => [check("rating_check", sql`${table.rating} BETWEEN 0 AND 5`)],
);
