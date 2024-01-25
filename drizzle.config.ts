import { Config, defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./app/schema.ts",
  out: "./migrations",
  verbose: true,
  strict: true,
  dbCredentials: {
    wranglerConfigPath: "wrangler.toml",
    dbName: "azuki-db",
  },
} satisfies Config);
