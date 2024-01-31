import { drizzle } from "drizzle-orm/d1";
import initializeHono from "@/initializeHono";
import { items } from "@/schema";

export const apiItems = initializeHono().get("/", async (c) => {
  const db = drizzle(c.env.DB);
  const result = await db.select().from(items).all();
  return c.json(result);
});
