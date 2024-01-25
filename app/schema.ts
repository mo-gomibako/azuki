import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id"),
  name: text("name"),
});

export const items = sqliteTable("items", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name"),
});
