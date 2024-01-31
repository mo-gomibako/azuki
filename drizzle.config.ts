import { Config, defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./app/schema.ts",
  out: "./migrations",
  strict: true,
  driver: "d1",
  dbCredentials: {
    wranglerConfigPath: "wrangler.toml",
    dbName: "azuki-db",
  },
} satisfies Config);
