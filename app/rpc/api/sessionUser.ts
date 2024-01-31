import initializeHono from "@/initializeHono";

export const apiSessionUser = initializeHono().get("/", async (c) => {
  return c.json({
    user: c.get("user"),
    session: c.get("session"),
  });
});
