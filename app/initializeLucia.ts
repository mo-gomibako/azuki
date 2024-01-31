import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";

import { sessions, users } from "@/schema";
import { Lucia } from "lucia";
import { DrizzleD1Database } from "drizzle-orm/d1";
import { Google } from "arctic";
import { Context } from "hono";
import { HonoEnv } from "./initializeHono";

declare module "lucia" {
  interface Register {
    Lucia: ReturnType<typeof initializeLucia>;
  }
}

export default function initializeLucia(db: DrizzleD1Database) {
  return new Lucia(new DrizzleSQLiteAdapter(db, sessions, users));
}

export function initializeGoogleAuth(c: Context<HonoEnv>) {
  return new Google(
    c.env.GOOGLE_OAUTH_CLIENT_ID,
    c.env.GOOGLE_OAUTH_CLIENT_SECRET,
    c.env.DEV === "development"
      ? "http://localhost:8787/api/login/google/callback"
      : "https://azuki.momoogles.net/api/login/google/callback",
  );
}
