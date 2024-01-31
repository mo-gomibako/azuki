import { Hono } from "hono";
import { Session, User } from "lucia";

type Bindings = {
  DB: D1Database;
  DEV?: "development";
  GOOGLE_OAUTH_CLIENT_ID: string;
  GOOGLE_OAUTH_CLIENT_SECRET: string;
};

type Variables = {
  user: User | null;
  session: Session | null;
};

export interface HonoEnv {
  Bindings: Bindings;
  Variables: Variables;
}

export default function initializeHono() {
  return new Hono<HonoEnv>();
}
