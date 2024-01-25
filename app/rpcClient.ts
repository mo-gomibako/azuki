import { hc } from "hono/client";
import { Rpc } from "./rpc";

export const rpcClient = hc<Rpc>(
  import.meta.env.DEV
    ? "http://localhost:8787/"
    : "https://azuki.momoogles.net",
);
