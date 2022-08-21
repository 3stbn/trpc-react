import { Context } from "..";
import { router } from "@trpc/server";

export function createRouter() {
  return router<Context>();
}
