import { drizzle } from "drizzle-orm/d1";
import initializeHono from "@/initializeHono";
import * as schema from "@/schema";

export const apiUsers = initializeHono().get("/", async (c) => {
  const db = drizzle(c.env.DB, { schema: schema });
  const result = await db.query.users.findMany({
    with: {
      oauthAccounts: true,
      session: true,
    },
  });
  return c.json(
    result.map(({ name, icon, oauthAccounts, session }) => ({
      name,
      icon,
      oauthAccounts: oauthAccounts.map(({ providerId }) => {
        providerId;
      }),
      session: session?.expiresAt,
    })),
  );
});
