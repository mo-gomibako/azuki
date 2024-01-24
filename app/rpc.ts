import { Hono } from "hono";
const rpc = new Hono();

rpc.get("/api/hello", (c) => c.text("Hello Hono!"));

export default rpc;
