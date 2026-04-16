import type { SupabaseClient } from "@supabase/supabase-js";
import type z from "zod";
import type { Database } from "~/supa-client";
import type { formSchema } from "./pages/create-job-page";

export const createJob = async (
  client: SupabaseClient<Database>,
  data: z.infer<typeof formSchema>,
) => {
  const payload: Database["public"]["Tables"]["jobs"]["Insert"] = {
    position: data.position,
    overview: data.overview,
    responsibilities: data.responsibilities,
    qualifications: data.qualifications,
    preferred_qualifications: data.preferredQualifications,
    skills: data.skills,
    company_name: data.companyName,
    company_logo: data.companyLogo,
    company_location: data.companyLocation,
    company_website: data.companyWebsite,
    job_type: data.employmentType as Database["public"]["Enums"]["job_types"],
    work_type: data.work as Database["public"]["Enums"]["work_types"],
    salary: data.salary as Database["public"]["Enums"]["job_salary_types"],
  };

  const { data: jobData, error } = await client
    .from("jobs")
    .insert(payload)
    .select()
    .single();

  if (error) {
    throw error;
  }
  return jobData;
};
