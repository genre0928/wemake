CREATE TYPE "public"."team_stage" AS ENUM('initial', 'prototype', 'operation');

CREATE TABLE "teams" (
	"team_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "teams_team_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"team_stage" "team_stage" NOT NULL,
	"size" integer NOT NULL,
	"position" text NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "size_check" CHECK ("teams"."size" BETWEEN 1 AND 100)
);
