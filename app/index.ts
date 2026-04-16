// from 'drizzle-orm/sql명'을 통해 다양한 sql과 소통 가능
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres(process.env.DATABASE_URL!, { prepare: false });
const db = drizzle(client);

export default db;
