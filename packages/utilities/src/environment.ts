import z from "zod";

export const Environment = {
    get POSTGRESQL_URI() {
        return z.url().parse(process.env.POSTGRESQL_URI);
    },
    get MONGO_URI() {
        return z.url().parse(process.env.MONGO_URI);
    }
} as const