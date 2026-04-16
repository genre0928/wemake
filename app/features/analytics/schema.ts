import { jsonb, pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core"

export const eventTypes = pgEnum("event_types", [
    "product_view",
    "profile_view",
    "product_visit"
])

export const events = pgTable("events", {
    event_id : uuid("event_id").primaryKey().defaultRandom(),
    event_type : eventTypes("event_type"),
    event_data : jsonb("event_data"),
    created_at : timestamp("created_at").defaultNow(),
})