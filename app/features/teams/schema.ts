import {
  bigint,
  check,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { TEAM_STATUS } from "./constants";
import { sql } from "drizzle-orm";

export const teamStage = pgEnum(
  "team_stage",
  TEAM_STATUS.map((status) => status.value) as [string, ...string[]],
);

export const teams = pgTable(
  "teams",
  {
    team_id: bigint({ mode: "number" })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    name: text().notNull(),
    team_stage: teamStage("team_stage").notNull(),
    size: integer().notNull(),
    position: text().notNull(),
    description: text().notNull(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
  },
  (table) => [check("size_check", sql`${table.size} BETWEEN 1 AND 100`)],
);
