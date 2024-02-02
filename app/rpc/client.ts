import { hc } from "hono/client";
import { Rpc } from "@/rpc";
import { dev } from "@/env";

export const rpcBaseUrl = dev(import.meta.env)
  ? "http://localhost:8787"
  : "https://azuki.momoogles.net";

export const rpcClient = hc<Rpc>(
  rpcBaseUrl,
  dev(import.meta.env)
    ? {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        fetch: (input, requestInit, Env, executionCtx) =>
          fetch(input, {
            ...requestInit,
            credentials: "include",
            mode: "cors",
          }),
      }
    : {},
);
