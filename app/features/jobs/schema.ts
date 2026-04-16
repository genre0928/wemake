import { bigint, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { JOB_SALARY_TYPES, JOB_TYPES, WORK_TYPES } from "./constants";

export const jobTypes = pgEnum(
  "job_types",
  JOB_TYPES.map((type) => type.value) as [string, ...string[]],
);

export const workTypes = pgEnum(
  "work_types",
  WORK_TYPES.map((type) => type.value) as [string, ...string[]],
);

export const jobSalaryTypes = pgEnum(
  "job_salary_types",
  JOB_SALARY_TYPES.map((type) => type.value) as [string, ...string[]],
);

export const jobs = pgTable("jobs", {
  job_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  position: text().notNull(),
  overview: text().notNull(),
  responsibilities: text().notNull(),
  qualifications: text().notNull(),
  preferred_qualifications: text().notNull(),
  skills: text().notNull(),
  company_name: text().notNull(),
  company_logo: text().notNull(),
  company_location: text().notNull(),
  company_website: text().notNull(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
  job_type: jobTypes("job_type").notNull(),
  work_type: workTypes("work_type").notNull(),
  salary: jobSalaryTypes("salary").notNull(),
});
