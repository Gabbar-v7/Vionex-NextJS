import { Environment } from "@packages/utilities"
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './drizzle',
    schema: './src/pg/schema',
    dialect: 'postgresql',
    dbCredentials: {
        url: Environment.POSTGRESQL_URI,
    },
});