import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { items, users } from "./schema";
import { cors } from "hono/cors";

type Bindings = {
  DB: D1Database;
  ENVIRONMENT?: "development";
};

const rpc = new Hono<{ Bindings: Bindings }>()
  .basePath("/api")
  .use("*", async (c, next) => {
    if (c.env.ENVIRONMENT === "development") {
      const middleware = await cors({
        origin: "*",
        allowMethods: ["GET", "OPTIONS"],
      });
      return middleware(c, next);
    }
    return await next();
  })
  .get("users", async (c) => {
    const db = drizzle(c.env.DB);
    const result = await db.select().from(users).all();
    return c.json(result);
  })
  .get("items", async (c) => {
    const db = drizzle(c.env.DB);
    const result = await db.select().from(items).all();
    return c.json(result);
  });

export type Rpc = typeof rpc;

export default rpc;
