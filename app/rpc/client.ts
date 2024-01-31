import { hc } from "hono/client";
import { Rpc } from "@/rpc";

export const rpcBaseUrl = import.meta.env.DEV
  ? "http://localhost:8787"
  : import.meta.env.BASE_URL;

export const rpcClient = hc<Rpc>(rpcBaseUrl);
