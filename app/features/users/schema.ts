import {
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { POSITIONS_OPTIONS } from "./constants";

export const potisitionTypes = pgEnum(
  "position_types",
  POSITIONS_OPTIONS.map((option) => option.value) as [string, ...string[]],
);

export const users = pgTable("users", {
  id: uuid().primaryKey(),
});

export const profiles = pgTable("profiles", {
  profile_id: uuid()
    .primaryKey()
    .references(() => users.id),
  avatar: text(),
  name: text().notNull(),
  email: text().notNull().unique(),
  nickname: text().notNull(),
  position: potisitionTypes("position").notNull(),
  stats: jsonb().$type<{
    followers: number;
    following: number;
  }>(),
  views: jsonb(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});

export const follows = pgTable("follows", {
  follower_id: uuid().references(() => profiles.profile_id, {
    onDelete: "cascade",
  }),
  followed_id: uuid().references(() => profiles.profile_id, {
    onDelete: "cascade",
  }),
  created_at: timestamp().notNull().defaultNow(),
});
