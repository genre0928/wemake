CREATE TYPE "public"."job_salary_types" AS ENUM('all', '1000', '1000-2000', '2000-3000', '3000-4000', '4000-5000', '5000-6000', '6000-7000', '7000-8000', '8000-9000', '9000');--> statement-breakpoint
CREATE TYPE "public"."job_types" AS ENUM('all', 'full-time', 'contract', 'freelance', 'internship');--> statement-breakpoint
CREATE TYPE "public"."work_types" AS ENUM('remote', 'offline', 'unknown');--> statement-breakpoint
CREATE TABLE "jobs" (
	"job_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "jobs_job_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"position" text NOT NULL,
	"overview" text NOT NULL,
	"responsibilities" text NOT NULL,
	"qualifications" text NOT NULL,
	"preferred_qualifications" text NOT NULL,
	"skills" text NOT NULL,
	"company_name" text NOT NULL,
	"company_logo" text NOT NULL,
	"company_location" text NOT NULL,
	"company_website" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"job_type" "job_types" NOT NULL,
	"work_type" "work_types" NOT NULL,
	"salary" "job_salary_types" NOT NULL
);
