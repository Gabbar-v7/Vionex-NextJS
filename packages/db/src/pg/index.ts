import { Environment } from "@packages/utilities";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: Environment.POSTGRESQL_URI,
});
export const postgresClient = drizzle({ client: pool });
