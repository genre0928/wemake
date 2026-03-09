import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "database.types";
import client from "~/supa-client";
import { JOB_SALARY_TYPES, JOB_TYPES, WORK_TYPES } from "./constants";

type jobType = (typeof JOB_TYPES)[number]["value"];
type workType = (typeof WORK_TYPES)[number]["value"];
type salaryType = (typeof JOB_SALARY_TYPES)[number]["value"];

export const getJobs = async (
  client: SupabaseClient<Database>,
  {
    limit = 7,
    type,
    work,
    salary,
  }: {
    limit?: number;
    type?: jobType;
    work?: workType;
    salary?: salaryType;
  },
) => {
  const baseQuery = client.from("jobs").select("*").limit(limit);

  if (type && type !== "all") {
    baseQuery.eq("job_type", type);
  }

  if (work) {
    baseQuery.eq("work_type", work);
  }
  if (salary) {
    baseQuery.eq("salary", salary);
  }
  const { data, error } = await baseQuery;
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
