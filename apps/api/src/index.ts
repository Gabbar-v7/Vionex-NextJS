import { Elysia } from "elysia";
import { openapi } from "@elysia/openapi"
import { betterAuthPlugin, betterAuthView } from "./plugins/auth";

export const api = new Elysia({ prefix: "/api" })
  .use(openapi())
  .get("/", () => "Hello World")
  .all("/api/auth/*", betterAuthView)
  .use(betterAuthPlugin)


if (require.main === module) {
  api.listen(4800);
  console.log()
  console.log(`✓ Exposed: ${api.server?.url}`);
}