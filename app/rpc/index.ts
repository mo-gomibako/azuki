import { cors } from "hono/cors";
import initializeHono from "@/initializeHono";
import { apiItems } from "./api/items";
import { apiLogin } from "./api/login";
import { apiUsers } from "./api/users";
import { getCookie } from "hono/cookie";
import initializeLucia from "@/initializeLucia";
import { drizzle } from "drizzle-orm/d1";
import { apiSessionUser } from "./api/sessionUser";
import { csrf } from "hono/csrf";
import { dev } from "@/env";

const api = initializeHono()
  .route("users", apiUsers)
  .route("items", apiItems)
  .route("login", apiLogin)
  .route("session_user", apiSessionUser);

const app = initializeHono();

app.use("*", async (c, next) => {
  // NOTE: 開発環境ではcorsの制限を緩くしてcookieをのせたい
  if (dev(c.env)) {
    const middleware = cors({
      origin: "http://localhost:5174",
      allowMethods: ["GET", "OPTIONS"],
      credentials: true,
    });
    return middleware(c, next);
  }
  // NOTE: 本番環境では同ドメインになる
  return await next();
});

app.use("*", async (c, next) => {
  // if (dev(c.env)) {
  //   return await next();
  // }
  // NOTE: 本番環境ではGET,HEAD以外はheaderのOriginと比較しておく
  const middleware = csrf({
    origin: "https://azuki.momoogles.net",
  });
  return middleware(c, next);
});

app.use("*", async (c, next) => {
  const db = drizzle(c.env.DB);
  const lucia = initializeLucia(db);
  const sessionId = getCookie(c, lucia.sessionCookieName);

  if (!sessionId) {
    c.set("user", null);
    c.set("session", null);
    return await next();
  }

  const { session, user } = await lucia.validateSession(sessionId);

  if (session && session.fresh) {
    c.header("Set-Cookie", lucia.createSessionCookie(session.id).serialize(), {
      append: true,
    });
  }

  if (!session) {
    c.header("Set-Cookie", lucia.createBlankSessionCookie().serialize(), {
      append: true,
    });
  }

  c.set("user", user);
  c.set("session", session);
  return await next();
});

const rpc = app.route("/api", api);

export type Rpc = typeof rpc;

export default rpc;
