import * as trpcExpress from "@trpc/server/adapters/express";
import * as trpc from "@trpc/server";
import cors from "cors";
import express from "express";
import { z } from "zod";
const appRouter = trpc.router().query("helloWorld", {
  input: z.object({
    name: z.string(),
  }),
  async resolve(req) {
    return { message: `Hello ${req.input.name}` };
  },
});

export type AppRouter = typeof appRouter;

const app = express();

app.use(cors());
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

app.listen(4000);
