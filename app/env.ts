import { HonoEnv } from "@/initializeHono";
import { Context } from "hono";

export function dev(env: ImportMetaEnv): boolean;
export function dev(env: Context<HonoEnv>["env"]): boolean;
export function dev(env: Context<HonoEnv>["env"] | ImportMetaEnv): boolean {
  if (typeof env.DEV === "boolean") {
    return env.DEV;
  }
  return env.DEV === "development";
}

export function prod(env: ImportMetaEnv): boolean;
export function prod(env: Context<HonoEnv>["env"]): boolean;
export function prod(env: Context<HonoEnv>["env"] | ImportMetaEnv): boolean {
  if (typeof env.DEV === "boolean") {
    return !env.DEV;
  }
  return env.DEV !== "development";
}
