import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "../../../server/index";

export const trpc = createReactQueryHooks<AppRouter>();
